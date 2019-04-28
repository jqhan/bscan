# bscan

## Lightweight build scan tool
### Authors
- Johan Luttu, luttu@kth.se
- Oscar Rosquist, oscarros@kth.se
### Description
bscan is a lightweight build scan tool/build wrapper that captures the data about your builds and creates a link to a report about the build that can be displayed on a website. This can be useful if one is having problems with a build and want to request help from a colleague. The build scan link can then be easily shared which allows the colleague to quickly see everything about the build that's relevant, such as the build command, stack trace/output, environment, dependencies, etc.

We're inspired by the [build scans](https://gradle.com/build-scans/) that Gradle enterprise supports and we intend to create something similar that's not only for gradle. The wrapper is currently limited to gcc. It'll capture the command, environment variables, dependencies and the gcc output. It will also serve as a build time logging tool where you can see the average build times, visualized as charts. This can provide valuable insights. Every build scan will be pushed to a Node.js web server which stores them in its file system. Vue and bootstrap is used for front-end.


![Components](diagram.png)


### NOTICE
There's no logic implemented for authenticating the requests to the server. If you don't want to risk receiving bad requests, make your server inaccessible from outside your network.

### Installation 

#### Requirements 
* [python 3.7](https://www.python.org/downloads/)
* [node](https://nodejs.org/en/)

To install all dependencies, run the following in the root directory of the project:
```
./install.sh
```

