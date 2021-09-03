/**
 * @author David Molina - molina@seaos.co.jp
 */

/**
 * A OccupancyGridMarker uses an OccupancyGridClient to create a map for use with a Visualizator.
 *
 * @constructor
 * @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * tfClient (optional) - Read information from TF
 *   * robotClient (optional) - the calling instance in order to use web sockets
 *   * topic (optional) - the map topic to listen to
 *   * robot_pose (optional) - the robot topic or TF to listen position
 *   * rootObject (optional) - the root object to add this marker to
 *   * continuous (optional) - if the map should be continuously loaded (e.g., for SLAM)
 *   * rootObject (optional) - the root object to add the click listeners to and render robot markers to
 *   * image (optional) - the route of the image if we want to use the NavigationImage instead the NavigationArrow
 *   * viewer - the main viewer to render to
 */
 NAV2D.OccupancyGridMarker = function(options) {
  var that  = this;
  options   = options || {};

  var ros         = options.ros         || null;
  var tfClient    = options.tfClient    || null;
  var robotClient = options.robotClient || null;
  var map_topic   = options.topic       || '/map';
  var robot_pose  = options.robot_pose  || '/robot_pose';
  var rootObject  = options.rootObject  || new createjs.Container();
  var image       = options.image       || false;
  var useTriangle = options.useTriangle || false;
  var client      = options.gridClient  || null;
  var fillColor   = options.fillColor   || null;
  var size        = options.size        || null;
  var strokeSize  = options.strokeSize  || null;
  var strokeColor = options.strokeColor || null;
  var baseType    = options.baseType    || 'circle';
  var useHeading  = (options.useHeading === undefined ? true : false);
  var continuous  = options.continuous;
  var viewer      = options.viewer;
  var old_state   = null;

   // setup a client to get the map
  if (client === null) {
    client = new ROS2D.OccupancyGridClient({
      ros : ros,
      rootObject : rootObject,
      continuous : continuous,
      topic      : map_topic
    });
  }

  that.visualizator = new NAV2D.Visualizator({
    ros         : ros,
    tfClient    : tfClient,
    robotClient : robotClient,
    robot_pose  : robot_pose,
    rootObject  : rootObject,
    image       : image,
    size        : size,
    strokeSize  : strokeSize,
    strokeColor : strokeColor,
    fillColor   : fillColor,
    baseType    : baseType,
    useTriangle : useTriangle,
    useHeading  : useHeading,
  });

  client.on('change', function() {
    // scale the viewer to fit the map
    old_state = NAV2D.resizeMap(old_state, viewer, client.currentGrid);
  });

};