# RoboLigaUI

User interface to control games at the FRI robotics competition.

## Setup

To set up the project follow the instructions in the following [SETUP README](./roboliga-ui/README.md).

# Configuration

To configure game parameters change the values in [config.json](./roboliga-ui/config.json).

```javascript
// note the following parameters
name: "Robo liga Fri 2023: Rudnik", // name on the website's landing page
robot_time: 25, // max fuel time of the robot
field_key: "game_field" // needs to match the ID of the field that defines the entire arena
```

To configure the base url of the server update the [nuxt.config.ts](./roboliga-ui/nuxt.config.ts).

```javascript
runtimeConfig: {
    public: {
        baseApiUrl: 'http://localhost:8088' // change this value
    }
}
```
## Authors
- Matej Horvat

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENCE)