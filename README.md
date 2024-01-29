[SCREEN]: ./screen.png

# Life in JavaScript

Particle simulator with attraction settings based on particle colors.

![SCREEN]

## Change the rules

You can make your own rule system by setting how much one color is attracted or repelled by another.

```js
let rules = [
    [green, green, -0.01],
    [yellow, yellow, -0.01],
    [red, red, 0.05],
    [red, yellow, 0.05],
    [yellow, red, -0.05],
    [yellow, green, 0.05],
    [green, yellow, -0.05],
    [green, red, -0.05]
]
```

For each line, the first parameter is the color on which the rule will act, the second is the color where we will specify to what extent the first color is attracted. The last parameter is the attraction index. The closer this index is to 1, the more the first color will be attracted to the second. The closer this index is to -1, the more the first color will be repelled by the second.

## Features

- Click on a particle to track it.

## To do
- Create a button to add color.
- Create sliders to change a color population.
- Create sliders to change the attraction of each color.