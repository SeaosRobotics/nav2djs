nav2djs [![Build Status](https://api.travis-ci.org/GT-RAIL/nav2djs.png)](https://travis-ci.org/GT-RAIL/nav2djs)
=======

#### 2D Navigation Widget
For full documentation, see [the ROS wiki](http://ros.org/wiki/nav2djs) or check out some [working demos](http://robotwebtools.org/).

[JSDoc](http://robotwebtools.org/jsdoc/nav2djs/current/) can be found on the Robot Web Tools website.

This project is released as part of the [Robot Web Tools](http://robotwebtools.org/) effort.

### Usage
Pre-built files can be found in either [nav2d.js](build/nav2d.js) or [nav2d.min.js](build/nav2d.min.js).

Alternatively, you can use the current release via the Robot Web Tools CDN: ([full](http://cdn.robotwebtools.org/nav2djs/current/nav2d.js)) | ([min](http://cdn.robotwebtools.org/nav2djs/current/nav2d.min.js))

### Dependencies
nav2djs depends on:

[EventEmitter2](https://github.com/hij1nx/EventEmitter2). The current supported version is 0.4.14. The current supported version can be found on the Robot Web Tools CDN ([full](http://cdn.robotwebtools.org/EventEmitter2/0.4.14/eventemitter2.js)) | ([min](http://cdn.robotwebtools.org/EventEmitter2/0.4.14/eventemitter2.min.js))

[roslibjs](https://github.com/RobotWebTools/roslibjs). The current supported version is 0.14.0. The current supported version can be found on the Robot Web Tools CDN: ([full](http://cdn.robotwebtools.org/roslibjs/0.14.0/roslib.js)) | ([min](http://cdn.robotwebtools.org/roslibjs/0.14.0/roslib.min.js))

[EaselJS](https://github.com/CreateJS/EaselJS/). The current supported version is 0.7.1. The current supported version can be found on the Robot Web Tools CDN: ([full](http://cdn.robotwebtools.org/EaselJS/0.7.1/easeljs.js)) | ([min](http://cdn.robotwebtools.org/EaselJS/0.7.1/easeljs.min.js))

[ros2djs](https://github.com/RobotWebTools/ros2djs). The current supported version is 0.6.0. The current supported version can be found on the Robot Web Tools CDN: ([full](http://cdn.robotwebtools.org/ros2djs/0.6.0/ros2d.js)) | ([min](http://cdn.robotwebtools.org/ros2djs/0.6.0/ros2d.min.js))

### Build
Checkout [utils/README.md](utils/README.md) for details on building.

### License
ros2djs is released with a BSD license. For full terms and conditions, see the [LICENSE](LICENSE) file.

### Authors
See the [AUTHORS.md](AUTHORS) file for a full list of contributors.

nav2djs Build Setup
===================

[Grunt](http://gruntjs.com/) is used for building, including concatenating, minimizing, documenting, linting, and testing.

### Install Grunt and its Dependencies

#### Ubuntu 14.04

 1. Install Node.js and its package manager, NPM
   * `sudo apt-get install nodejs npm`
   * `sudo ln -s /usr/bin/nodejs /usr/bin/node`
 2. Install Grunt
   * `sudo npm install -g grunt-cli`
   * `sudo rm -rf ~/.npm ~/tmp`
 3. Install the Grunt tasks specific to this project
   * `cd /path/to/nav2djs/utils/`
   * `npm install .`
 4. (Optional) To generate the documentation, you'll need to setup Java. Documentation generation is not required for patches.
   * `echo "export JAVA_HOME=/usr/lib/jvm/default-java/jre" >> ~/.bashrc`
   * `source ~/.bashrc`

#### Ubuntu 12.04

 1. Install Node.js and its package manager, NPM
   * `sudo apt-get install python-software-properties`
   * `sudo add-apt-repository ppa:chris-lea/node.js`
   * `sudo apt-get update && sudo apt-get install nodejs phantomjs`
 2. Install Grunt
   * `sudo npm install -g grunt-cli`
   * `sudo rm -rf ~/.npm ~/tmp`
 3. Install the Grunt tasks specific to this project
   * `cd /path/to/nav2djs/utils/`
   * `npm install .`
 4. (Optional) To generate the documentation, you'll need to setup Java. Documentation generation is not required for patches.
   * `echo "export JAVA_HOME=/usr/lib/jvm/default-java/jre" >> ~/.bashrc`
   * `source ~/.bashrc`

#### OS X

 1. Install Node.js and its package manager, NPM
   * Go to [Node.js Downloads](http://nodejs.org/download/)
   * Download and install the Universal pkg file.
 2. Install Grunt and the test runner [Karma](http://karma-runner.github.io/)
   * `sudo npm install -g grunt-cli karma`
 3. Install the Grunt tasks specific to this project
   * `cd /path/to/nav2djs/utils/`
   * `npm install .`

### Build with Grunt

Before proceeding, please confirm you have installed the dependencies above.

To run the build tasks:

 1. `cd /path/to/nav2djs/utils/`
 2. `grunt build`

`grunt build` will concatenate and minimize the files under src and replace nav2d.js and nav2d.min.js in the build directory. It will also run the linter and test cases. This is what [Travis CI](https://travis-ci.org/RobotWebTools/nav2djs) runs when a Pull Request is submitted.

`grunt dev` will watch for any changes to any of the src/ files and automatically concatenate and minimize the files. This is ideal for those developing as you should only have to run `grunt dev` once.

`grunt doc` will rebuild all JSDoc for the project.

