/**
 * @author David Molina - molina@seaos.co.jp
 */

/**
 * A visualizator can be used to only display the object without sending navigation
 * goals.
 *
 * @constructor
 * @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * tfClient (optional) - the TF client
 *   * robotClient (optional) - the calling instance in order to use web sockets
 *   * robot_pose (optional) - the robot topic or TF to listen position
 *   * rootObject (optional) - the root object to add the click listeners to and render robot markers to
 */
 NAV2D.Visualizator = function(options) {
  var that = this;
  options  = options || {};

  var ros         = options.ros         || null;
  var tfClient    = options.tfClient    || null;
  var robotClient = options.robotClient || null;
  var robot_pose  = options.robot_pose  || '/robot_pose';
  var size        = options.size        || null;
  var strokeSize  = options.strokeSize  || 1;
  var strokeColor = options.strokeColor || null;
  var fill_color  = options.fillColor   || null;
  that.rootObject = options.rootObject  || new createjs.Container();
  var baseType    = options.baseType    || 'circle';
  var useTriangle = options.useTriangle || false;
  var useHeading  = (options.useHeading === undefined ? true : false);
  var use_image   = options.image;

  // get a handle to the stage
  var stage;
  if (that.rootObject instanceof createjs.Stage) {
    stage = that.rootObject;
  } else {
    stage = that.rootObject.getStage();
  }
  // marker for the robot
  var robotMarker = null;
  var color;
  if (use_image && ROS2D.hasOwnProperty('NavigationImage')) {
    robotMarker = new ROS2D.NavigationImage({
      size: size || 2.5,
      scaleX : 1.0 / stage.scaleX,
      scaleY : 1.0 / stage.scaleY,
      image: use_image,
      pulse: false
    });
  } else if (useTriangle) {
    if (fill_color !== null) {
      color = fill_color;
    }else{
      color = createjs.Graphics.getRGB(255, 128, 0, 0.66);
    }
    robotMarker = new ROS2D.NavigationArrow({
      size        : size || 10,
      strokeSize  : strokeSize || 3,
      strokeColor : strokeColor,
      fillColor   : color,
      pulse       : false
    });
  } else {
    if (fill_color !== null) {
      color = fill_color;
    } else {
      color = createjs.Graphics.getRGB(255, 128, 0, 0.66);
    }

    robotMarker = new ROS2D.NavigationShape({
      size        : size || 25,
      scaleX      : 1.0 / stage.scaleX,
      scaleY      : 1.0 / stage.scaleY,
      strokeSize  : strokeSize,
      strokeColor : strokeColor,
      fillColor   : color,
      pulse       : false,
      baseType    : baseType,
      useHeading  : useHeading,
    });
  }

  // wait for a pose to come in first
  robotMarker.visible = false;
  this.rootObject.addChild(robotMarker);
  var initScaleSet = false;

  that.poseUpdate = function(pose) {
    updateRobotPosition(pose.position,pose.orientation);
  };

  var updateRobotPosition = function(pose, orientation) {
    // update the robots position on the map
    robotMarker.x = pose.x;
    robotMarker.y = -pose.y;
    if (!initScaleSet) {
      robotMarker.scaleX = 1.0 / stage.scaleX;
      robotMarker.scaleY = 1.0 / stage.scaleY;
      initScaleSet = true;
    }
    // change the angle
    robotMarker.rotation = stage.rosQuaternionToGlobalTheta(orientation);
    // Set visible
    robotMarker.visible = true;
  };

  if(tfClient !== null) {
    tfClient.subscribe(robot_pose, function(tf) {
      updateRobotPosition(tf.translation,tf.rotation);
    });
  } else if (robotClient !== null) {
    robotClient.on('pose-update', function (pose) {
      updateRobotPosition(pose.position,pose.orientation);
    });
  } else {
    // setup a listener for the robot pose
    var poseListener = new ROSLIB.Topic({
      ros: ros,
      name: robot_pose,
      messageType: 'geometry_msgs/Pose',
      throttle_rate: 100
    });
    poseListener.subscribe(function(pose) {
      updateRobotPosition(pose.position,pose.orientation);
    });
  }

  that.pulse = function (pulse) {
    robotMarker.pulse(pulse);
  };

  that.pulsing = function () {
    return robotMarker.pulsing();
  };

  that.visible = function () {
    return robotMarker.visible;
  };

  /**
   * Hide the marker on the canvas
   */
  that.hide = function () {
    robotMarker.visible = false;
  };

  robotMarker.addEventListener('mousedown', function(event) {
    that.emit('mousedown', event);
  });

};

NAV2D.Visualizator.prototype.__proto__ = EventEmitter2.prototype;

// The following statement should be on the last loaded file
global.NAV2D = NAV2D;
