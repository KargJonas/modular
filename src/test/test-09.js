let frame = 0;

function getColor( input, magnitude ) {
  return {
    r: Math.abs( Math.sin( input ) * magnitude ),
    g: Math.abs( Math.sin( input + 45 ) * magnitude ),
    b: Math.abs( Math.sin( input + 90 ) * magnitude )
  };
}

function Counter( num, color ) {
  return Modular.el(
    "h1",
    {
      style: {
        "backgroundColor": `rgb(${ color.r },${ color.g },${ color.b })`,

        // ":hover": {
        //   color: "green"
        // }
      }
    },
    num
  );
}

async function anim() {
  window.requestAnimationFrame( anim );
  frame++;
  Modular.render( Counter( frame, getColor( frame / 100, 255 ) ), "#root" );
}

anim();