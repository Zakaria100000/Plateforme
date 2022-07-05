var canvas = document.getElementById("MatterCanva");

var Engine = Matter.Engine,
  Events = Matter.Events,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies,
  Vector = Matter.Vector;

// create engine
var engine = Engine.create(),
  world = engine.world;

// create renderer
var render = Render.create({
  canvas: document.getElementById("MatterCanva"),
  element: document.body,
  engine: engine,
  options: {
    background: "#FEF1E6",
    width: 800,
    height: 600,
    wireframes: false,
  },
});

Render.run(render);
// create runner
var runner = Runner.create();
Runner.run(runner, engine);
var group = Body.nextGroup(true),
  length = 200,
  width = 25;

var pendulum = Composites.stack(350, 160, 2, 1, 0, 0, function (x, y) {
  return Bodies.rectangle(x, y, length, width, {
    label: "pendulum",
    collisionFilter: { group: group },
    frictionAir: 0,
    chamfer: 5,
    render: {
      fillStyle: "transparent",
      lineWidth: 1,
    },
  });
});

Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
  stiffness: 0.1, //<0.9 deviens un ressort >0.9 deviens un simple fil
  length: 0100, //Fil qui permet de relier deux pendulum peut etre nul si on ne met pas de length
  angularStiffness: 0.00000000001,
  render: {
    strokeStyle: "#4a485b",
  },
});

Composite.add(
  pendulum,
  (shit = Constraint.create({
    bodyB: pendulum.bodies[0],
    pointB: { x: -length * 0.42, y: 0 },
    pointA: {
      x: pendulum.bodies[0].position.x - length * 0.42,
      y: pendulum.bodies[0].position.y,
    },
    stiffness: 0.9,
    length: 0100,
    render: {
      strokeStyle: "#4a485b",
    },
  }))
);
console.log(shit);

var lowerArm = pendulum.bodies[1];

Body.rotate(lowerArm, -Math.PI * 0.3, {
  x: lowerArm.position.x - 100,
  y: lowerArm.position.y,
});

//Composite.add(world, pendulum);

var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);
console.log(mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;
// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 700, y: 600 },
});

// context for MatterTools.Demo
/*function doStuff() {
  console.log(pendulum.bodies[0].speed);
  console.log(pendulum.bodies[1].speed);
}
setInterval(doStuff, 100);*/

//Creation of the chart

/* var seconds = 0; //Creation des valeurs de l'axe Y
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Body 1",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        label: "Body 2",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  },
  options: {
    scales: {
      y: {},
      y1: {},
    },
  },
});

//Function pour avoir les valeurs de l'axe X

function adddata(chart, data, idx) {
  chart.data.datasets[idx].data.push(data);
  /*chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
}

function addalldata(chart, label, data) {
  const arrlegnthofbodies = data.bodies.length;
  for (let i = 0; i < arrlegnthofbodies; i++) {
    adddata(chart, data.bodies[i].speed, i);
  }
  chart.data.labels.push(label);
  chart.update();
}

function doStuff() {
  //adddata(myChart, i + "s", pendulum.bodies[0].speed, 0);
  //adddata(myChart, i + "s", pendulum.bodies[1].speed, 1);
  addalldata(myChart, seconds + "s", pendulum);
  seconds = seconds + 1;
  if (seconds >= 20) {
    updateConfigByMutating(myChart);
  }
}
setInterval(doStuff, 1000);
function updateConfigByMutating(chart) {
  chart.data.labels.shift();
  chart.data.datasets[0].data.shift();
  chart.data.datasets[1].data.shift();
  chart.update(); // chart now renders with dataset hidden
} */

//Function pour avoir les valeurs de l'axe X

/*
function pausengine() {
  console.log("pause");

  Render.stop(render);
}
function unpauseengine() {
  console.log("unpause");
  Render.run(render);
}
*/

//Function pour pause unpause

var clicked = 0;
var paused = false;
var stock = 0;

Matter.Events.on(engine, "beforeUpdate", function (event) {
  try {
    if (paused) {
      if (clicked == 1) {
        for (let i = 0; i < Composite.allBodies(world).length; i++) {
          if (mouseConstraint.body.id === Composite.allBodies(world)[i].id) {
            Composite.allBodies(world)[i].isStatic = false;
          }
        }
      } else if (clicked == 0) {
        for (let i = 0; i < Composite.allBodies(world).length; i++) {
          Composite.allBodies(world)[i].isStatic = true;
        }
      }
    }
  } catch (error) {}
});

function clickoncanva() {
  clicked = 1;
}

function mouseUp() {
  clicked = 0;
  if (clickedcreation == 0) {
  } else {
    clickedcreation = 2;
  }
}
//3 etats non click = 0 / click bouton = 1 / click creation = 2

//Fin de la fonction pour pause unpause

//Function des boutons d'affichage
function displayGraph() {
  document.getElementById("MatterCanva").style.display = "none";
  document.getElementById("myChart").style.display = "block ";
  document.getElementById("graphdessin").style.display = "block";

  document.getElementById("wrapper_sliders").style.display = "none";
  document.getElementById("myChart").style.display = "inline-flex";
  document.getElementById("myChart").style.width = "800px";
  document.getElementById("myChart").style.height = "400px";
}

function displaysimulation() {
  document.getElementById("MatterCanva").style.display = "block";
  document.getElementById("graphdessin").style.display = "none";
  document.getElementById("myChart").style.display = "none";

  document.getElementById("wrapper_sliders").style.display = "block";
  document.getElementById("MatterCanva").style.display = "block";
  document.getElementById("MatterCanva").style.width = "800px";
  document.getElementById("MatterCanva").style.margin = "auto";
  document.getElementById("MatterCanva").style.height = "600px";
}

function displaygraphandsimulation() {
  document.getElementById("MatterCanva").style.display = "inline-flex";
  document.getElementById("MatterCanva").style.width = "600px";
  document.getElementById("MatterCanva").style.height = "500px";
  document.getElementById("myChart").style.display = "inline-flex";
  document.getElementById("graphdessin").style.display = "block";

  document.getElementById("wrapper_sliders").style.display = "block";
  document.getElementById("myChart").style.width = "800px";
  document.getElementById("myChart").style.height = "400px";
}

function affichagegraph() {
  document.getElementById("ongletparam").style.display = "none";
  document.getElementById("ongletgraph").style.display = "block ";
}
function affchageparam() {
  document.getElementById("ongletparam").style.display = "block";
  document.getElementById("ongletgraph").style.display = "none";
}
//Fin de la fonction des boutons d'affichage

//Function to create a body from the mouse position
let objets = [];
var idobj = 0;
function savetoexport() {
  for (let i = 0; i < Composite.allBodies(world).length; i++) {
    objets.push(Composite.allBodies(world)[i]);
  }
}
function createbodyfrommouseposition() {
  console.log("createbodyfromposition");
  bodyrond = Bodies.circle(
    mouse.position.x,
    mouse.position.y,
    document.getElementById("rayoncreationrond").value,
    {
      mass: document.getElementById("masscreationrond").value,
      frictionAir: 0.001,
      restitution: 0.8,
      density: 0.001,
      render: {
        strokeStyle: "black",
        lineWidth: 1,
        fillStyle: document.getElementById("colorpickertb").value,
      },
    }
  );
  Matter.World.add(world, bodyrond);
}
/*
let body = Bodies.rectangle(x, y, length, width, {
  label: "pendulum",
  collisionFilter: { group: group },
  frictionAir: 0,
  chamfer: 5,
  render: {
    fillStyle: "transparent",
    lineWidth: 1,
  },
});
Composite.add(
  body,
  Constraint.create({
    bodyB: body,
    pointB: { x: -length * 0.42, y: 0 },
    pointA: {
      x: body.position.x - length * 0.42,
      y: body.position.y,
    },
    stiffness: 0.9,
    length: 0,
    render: {
      strokeStyle: "#4a485b",
    },
  })
)
*/

var tableautest = [];
Events.on(mouseConstraint, "mousedown", function (event) {
  menu.style.display = "none";
  console.log("mousedown");

  createconstrainte();
  createconstrainteanchor();
  editbody();
});
let bodyinformation;
Events.on(mouseConstraint, "mousedown", function (event) {
  if (mouseConstraint.body !== null) {
    bodyinformation = mouseConstraint.body;
  }
  console.log(mouseConstraint.body);
});
Events.on(mouseConstraint, "mouseup", function (event) {
  if (clickedcreation == 2) {
    createbodyfrommouseposition();
    console.log("event mouse up");

    document.getElementById("rond").style.display = "none";
    clickedcreation = 0;
  }
});
//Fin de la fonction de création de body

//Function to create download from the canvas
const canvasdownload = document.getElementById("MatterCanva");
const ctxjpeg = canvasdownload.getContext("2d");
const reader = new FileReader();
const img = new Image();

function download() {
  const image = canvasdownload.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}
//Fin de la fonction download

function changeheight() {
  console.log(pendulum.bodies[1]);
  Matter.Body.scale(pendulum.bodies[1], 1, 1.1);
}

var clickedcreation = 0;

function Creation() {
  if (
    document.getElementById("rayoncreationrond").value > 10 &&
    document.getElementById("rayoncreationrond").value <= 200
  ) {
    console.log(document.getElementById("rayoncreationrond").value);
    calculrond(document.getElementById("rayoncreationrond").value);
    console.log(clickedcreation);
    if (clickedcreation == 0) {
      clickedcreation = 1;

      document.getElementById("rond").style.backgroundColor =
        document.getElementById("colorpickertb").value;
      document.getElementById("rond").style.borderColor = "black";
      document.getElementById("rond").style.display = "block";
    } else {
      clickedcreation = 0;
      console.log("clickedshit == 0");
    }
  } else {
    if (document.getElementById("rayoncreationrond").value < 10) {
      noobjectselection("Rayon trop petit");
    } else {
      noobjectselection("Rayon trop grand");
    }
  }
}

var supplier = 0;

function supp() {
  console.log(objets);
  if (supplier == 0) {
    supplier = 1;
  } else {
    supplier = 0;
  }
}

var supplier2 = 0;

function supp2() {
  console.log(supplier2);
  if (supplier2 == 0) {
    supplier2 = 1;
  } else {
    supplier2 = 0;
  }
}

function mettre() {
  /*var shit = [];
  shit = Composite.allBodies(world)[4];
  Matter.World.remove(world, Composite.allBodies(world)[4]);
  bodyrond = Bodies.circle(
    shit.position.x,
    shit.position.y,
    1000,
    { frictionAir: 0.001, label: "circle" }
  );
  objets[0][0] = bodyrond;
  objets[0][1].bodyB = bodyrond;
  Matter.World.add(world, objets[0][0]);
  Matter.World.add(world, objets[0][1]);*/
  Composite.allBodies(world)[4].mass += 1000;
  Composite.allBodies(world)[4].inverseMass =
    1 / Composite.allBodies(world)[4].mass;
  console.log(Composite.allBodies(world)[4].mass);
  console.log(Composite.allBodies(world)[4].inverseMass);
}

Composite.add(world, [
  // walls
  Bodies.rectangle(300, -1000, 2000, 2000, {
    isStatic: true,
    label: "wall",
  }), //haut
  Bodies.rectangle(300, 1520, 2000, 2000, {
    isStatic: true,
    label: "wall",
    render: {
      strokeStyle: "black",
      lineWidth: 2,
      fillStyle: "transparent",
    },
  }), //bas
  Bodies.rectangle(1750, 300, 2000, 600, { isStatic: true, label: "wall" }), //droite
  Bodies.rectangle(-1050, 300, 2000, 600, { isStatic: true, label: "wall" }), //gauche
]);

newconstraints = [];
function createconstrainte() {
  if (supplier == 1) {
    if (tableautest.length == 2) {
      for (let index = 0; index < tableautest.length; index++) {
        console.log(tableautest[index]);
      }
      if (tableautest[0] != tableautest[1]) {
        if (document.getElementById("fillien").checked == true) {
          var contrainte = Constraint.create({
            label: "lien",
            stiffness: 1,
            length: document.getElementById("lienlongueur").value,
            bodyA: tableautest[0],
            pointA: { x: 0, y: 0 },
            bodyB: tableautest[1],
            pointB: { x: 0, y: 0 },
            render: {
              strokeStyle: document.getElementById("liencouleur").value,
            },
          });
          console.log("avantcreation");
          Matter.World.add(world, contrainte);
          console.log("aprescreation");

          console.log("ksjbkjbkajsbfjkbf");
          tableautest[0].render.lineWidth = 0;
          tableautest[1].render.lineWidth = 0;
          tableautest = [];
        } else {
          var contrainte = Constraint.create({
            label: "lien",
            stiffness: document.getElementById("klien").value,
            length: document.getElementById("lienlongueur").value,
            bodyA: tableautest[0],
            pointA: { x: 0, y: 0 },
            bodyB: tableautest[1],
            pointB: { x: 0, y: 0 },
            render: {
              strokeStyle: document.getElementById("liencouleur").value,
            },
          });
          console.log("avantcreation");
          Matter.World.add(world, contrainte);
          console.log("aprescreation");

          console.log("ksjbkjbkajsbfjkbf");

          tableautest[0].render.lineWidth = 0;
          tableautest[1].render.lineWidth = 0;

          tableautest = [];
        }
      } else {
        tableautest = [];
      }
      supplier = 0;
    } else {
      try {
        console.log("SUPP FUNCTION", mouseConstraint.body);
        if (mouseConstraint.body.label != "wall") {
          tableautest.push(mouseConstraint.body);
          if (mouseConstraint.body.render.fillStyle == "#ff0000") {
            mouseConstraint.body.render.strokeStyle = "Green";

            mouseConstraint.body.render.lineWidth = 6;
          } else {
            mouseConstraint.body.render.strokeStyle = "red";
            mouseConstraint.body.render.lineWidth = 6;
          }
          console.log("Stockage des objets");
          if (tableautest.length == 2) {
            createconstrainte();
          }
        } else {
          console.log("wall");
        }
      } catch (error) {}
    }
  }
}

function retirer() {
  Matter.World.clear(world);
  Engine.clear(engine);
  Composite.add(world, [
    // walls
    Bodies.rectangle(300, -100, 900, 50, { isStatic: true, label: "wall" }),
    Bodies.rectangle(300, 525, 900, 50, { isStatic: true, label: "wall" }),
    Bodies.rectangle(500, 300, 50, 600, { isStatic: true, label: "wall" }),
    Bodies.rectangle(-100, 300, 50, 600, { isStatic: true, label: "wall" }),
  ]);
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);
  console.log(mouseConstraint);
  // keep the mouse in sync with rendering
  render.mouse = mouse;
  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 },
  });
}

var tabltest = [];
function createconstrainteanchor() {
  if (supplier2 == 1) {
    if (tableautest.length == 1) {
      if (document.getElementById("filancrage").checked == true) {
        var contrainte = Constraint.create({
          pointA: { x: mouse.position.x, y: mouse.position.y },
          bodyB: tableautest[0],
          stiffness: 1,
          length: document.getElementById("ancragelongeur").value,
          label: "anchor",
          render: {
            strokeStyle: document.getElementById("ancragecouleur").value,
          },
        });
        Matter.World.remove(world, tableautest[0]);
        Matter.World.add(world, tableautest[0]);
        Matter.World.add(world, contrainte);

        tableautest[0].render.lineWidth = 0;

        console.log(tableautest[0]);
        tableautest = [];
        supplier2 = 0;
      } else {
        var contrainte = Constraint.create({
          pointA: { x: mouse.position.x, y: mouse.position.y },
          bodyB: tableautest[0],
          stiffness: document.getElementById("kancrage").value,
          length: document.getElementById("ancragelongeur").value,
          label: "anchor",
          render: {
            strokeStyle: document.getElementById("ancragecouleur").value,
          },
        });
        Matter.World.add(world, contrainte);
        tableautest[0].render.lineWidth = 0;
        tableautest = [];
        supplier2 = 0;
      }
    } else {
      try {
        console.log("SUPP FUNCTION", mouseConstraint.body);
        if (mouseConstraint.body.label != "wall") {
          tableautest.push(mouseConstraint.body);
          if (mouseConstraint.body.render.fillStyle == "#ff0000") {
            mouseConstraint.body.render.strokeStyle = "Green";

            mouseConstraint.body.render.lineWidth = 6;
          } else {
            mouseConstraint.body.render.strokeStyle = "red";
            mouseConstraint.body.render.lineWidth = 6;
          }
        } else {
          console.log("wall");
        }
      } catch (error) {}
    }
  }
}

function parametre() {
  var p = document.createElement("p");
  p.innerHTML = Composite.allBodies(world)[0].velocity;
  console.log(Composite.allBodies(world)[4]);
}
//setInterval(parametre, 1000);

function createhtmlfromarray() {
  var di = document.getElementById("ongletcreationwrapper");
  var p = document.createElement("p");
  p.innerHTML = "test";
  console.log("CREATE");
  di.appendChild(p);
}
var editvar = 0;

function edit() {
  if (editvar == 0) {
    editvar = 1;
  } else {
    editvar = 0;
  }
}

function editbody() {
  try {
    if (editvar == 1) {
      if (mouseConstraint.body.label !== "wall") {
        console.log(mouseConstraint.body);
        var object = mouseConstraint.body;
        var di = document.getElementById("ongletcreationwrapper");
        var p = document.createElement("p");
        var button = document.createElement("BUTTON");
        var button2 = document.createElement("BUTTON");

        button.onclick = function () {
          console.log(object);
          for (let i = 0; i < Composite.allConstraints(world).length; i++) {
            if (
              Composite.allConstraints(world)[i].label !== "Mouse Constraint"
            ) {
              if (
                Composite.allConstraints(world)[i].bodyA === object ||
                Composite.allConstraints(world)[i].bodyB === object
              ) {
                console.log("Nice");
                Matter.World.remove(world, Composite.allConstraints(world)[i]);
              }
            }
          }
          Matter.World.remove(world, object);
          di.textContent = "";
        };

        button2.onclick = function () {
          for (let i = 0; i < Composite.allConstraints(world).length; i++) {
            if (
              Composite.allConstraints(world)[i].label !== "Mouse Constraint"
            ) {
              if (
                Composite.allConstraints(world)[i].bodyA === object ||
                Composite.allConstraints(world)[i].bodyB === object
              ) {
                console.log("Nice");
                console.log(Composite.allConstraints(world)[i]);
                Matter.World.remove(world, Composite.allConstraints(world)[i]);
              }
            }
          }
          di.textContent = "";
        };
        di.textContent = "";
        button.innerHTML = "delete body + constraints";
        button2.innerHTML = "delete constraint";
        p.innerHTML = mouseConstraint.body.label;
        di.appendChild(p);
        di.appendChild(button);
        di.appendChild(button2);
        editvar = 0;
      }
    }
  } catch (error) {}
}
function testfct() {
  onmousemove = function (e) {
    document.getElementById("rond").style.left =
      e.clientX - document.getElementById("rayoncreationrond").value + "px";
    document.getElementById("rond").style.top =
      e.clientY - document.getElementById("rayoncreationrond").value + "px";
  };
}

setInterval(testfct, 100);

function creernon() {
  clickedcreation = 0;
  document.getElementById("rond").style.display = "none";
}

const menu = document.querySelector(".menu");
const editmenus = document.getElementById("editmenu");
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  collider = Bodies.rectangle(mouse.position.x, mouse.position.y, 1, 1, {
    isSensor: true,
    isStatic: true,
    label: "detecteur",
    render: {
      strokeStyle: "red",
      fillStyle: "red",
      lineWidth: 1,
    },
  });
  Matter.World.add(world, collider);
  menu.style.display = "block";
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
});

function editmenu() {
  if (selectobjectcopie !== "") {
    let newradius = document.getElementById("editradius");
    let newcolor = document.getElementById("editcolor");

    menu.style.display = "none";
    editmenus.style.display = "flex";
    editmenus.style.left = "200px";
    editmenus.style.top = "200px";
    newcolor.value = selectobjectcopie.render.fillStyle;
    newradius.value = selectobjectcopie.circleRadius;
    console.log(selectobjectcopie);
  } else {
    noobjectselection("Pas d'objet séléctionné");
  }

  menu.style.display = "none";
}

let selectobjectcopie = "";

function suprimmermenu() {
  if (selectobjectcopie !== "") {
    menu.style.display = "none";
    Composite.allConstraints(world).forEach((constraint) => {
      if (
        constraint.bodyA === selectobjectcopie ||
        constraint.bodyB === selectobjectcopie
      ) {
        Matter.World.remove(world, constraint);
      }
    });
    Matter.World.remove(world, selectobjectcopie);
  } else {
    noobjectselection("Pas d'objet séléctionné");
  }
  selectobjectcopie = "";
  menu.style.display = "none";
}
function dupliquermenu() {
  if (selectobjectcopie !== "") {
    menu.style.display = "none";
    let x = selectobjectcopie.position.x - 100;
    let y = selectobjectcopie.position.y - 100;
    let dupliquationobjet = Bodies.circle(
      x,
      y,
      selectobjectcopie.circleRadius,
      {
        frictionAir: 0.001,
        restitution: 0.8,
        density: 0.001,
        render: {
          strokeStyle: "black",
          lineWidth: 1,
          fillStyle: selectobjectcopie.render.fillStyle,
        },
      }
    );
    Matter.World.add(world, dupliquationobjet);
  } else {
    noobjectselection("Pas d'objet séléctionné");
  }
  selectobjectcopie = "";
  menu.style.display = "none";
}

Events.on(engine, "collisionStart", function (event) {
  try {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA.label === "detecteur") {
        selectobjectcopie = pair.bodyB;
        console.log(selectobjectcopie);

        Matter.World.remove(world, collider);

        console.log(selectobjectcopie);
      } else if (pair.bodyB.label === "detecteur") {
        selectobjectcopie = pair.bodyA;

        console.log(selectobjectcopie);
        Matter.World.remove(world, collider);
      }

      Matter.World.remove(world, collider);
    }
  } catch (error) {}
});

Events.on(engine, "collisionEnd", function (event) {
  try {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA.label === "detecteur") {
        selectobjectcopie = pair.bodyB;

        console.log(selectobjectcopie);

        Matter.World.remove(world, collider);
      } else if (pair.bodyB.label === "detecteur") {
        selectobjectcopie = pair.bodyA;

        console.log(selectobjectcopie);

        Matter.World.remove(world, collider);
      }

      Matter.World.remove(world, collider);
    }
  } catch (error) {}
});
function effacercollider() {
  try {
    Matter.World.remove(world, collider);
    Composite.allBodies(world).map((i) => {
      if (i.label == "detecteur") {
        Matter.World.remove(world, i);
      }
    });
  } catch (error) {}
}

setInterval(effacercollider, 200);

function editfct() {
  let newradius = document.getElementById("editradius");
  let newcolor = document.getElementById("editcolor");

  let contraintes = [];
  for (let i = 0; i < Composite.allConstraints(world).length; i++) {
    if (Composite.allConstraints(world)[i].label !== "Mouse Constraint") {
      if (
        Composite.allConstraints(world)[i].bodyA === selectobjectcopie ||
        Composite.allConstraints(world)[i].bodyB === selectobjectcopie
      ) {
        contraintes.push(Composite.allConstraints(world)[i]);
      }
    }
  }
  console.log(contraintes);
  console.log(selectobjectcopie);

  let editobject = Bodies.circle(
    selectobjectcopie.position.x,
    selectobjectcopie.position.y,
    newradius.value,
    {
      frictionAir: 0.001,
      restitution: 0.8,
      density: 0.001,
      render: {
        strokeStyle: "black",
        lineWidth: 1,
        fillStyle: newcolor.value,
      },
    }
  );
  Matter.World.remove(world, selectobjectcopie);
  Matter.World.add(world, editobject);
  for (let index = 0; index < contraintes.length; index++) {
    if (contraintes[index].bodyA === selectobjectcopie) {
      contraintes[index].bodyA = editobject;
    }
    if (contraintes[index].bodyB === selectobjectcopie) {
      contraintes[index].bodyB = editobject;
    }
    Matter.World.add(world, contraintes[index]);
  }

  editmenus.style.display = "none";
  selectobjectcopie = "";
}

function noobjectselection(texte) {
  document.getElementById("bg-black").style.display = "flex";
  setTimeout(() => {
    document.getElementById("bg-black").style.display = "none";
  }, 1000);
  document.getElementById("texte-p").innerHTML = texte;
}

function calculrond(valeur) {
  //calcul de la valeur de l'image affiché lors du drag
  //120 -> 50

  document.getElementById("rond").style.height = (valeur * 120) / 50 + "px";
  document.getElementById("rond").style.width = (valeur * 120) / 50 + "px";
}

//function en rapport avec la navbar de la toolbox
let minimized = 1;
function minimizetb() {
  mini();
  if (minimized) {
    minimized = 0;
  } else {
    minimized = 1;
  }
}

function mini() {
  if (minimized) {
    document.getElementById("elementbox").style.display = "none";
    document.getElementById("toolbox").style.height = "30px";
  } else {
    document.getElementById("elementbox").style.display = "flex";
    document.getElementById("toolbox").style.height = "455px";
  }
}

function closetb() {
  document.getElementById("toolbox").style.display = "none";
  console.log("toolbox");
  opened = 1;
}

dragElement(document.getElementById("toolbox")); //functions pour permettre le deplacement de la toolbox

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("navtoolbox")) {
    document.getElementById("navtoolbox").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//fin des outils toolbox

//fonctions en rapport avec les boutons BT / Chart / info

let opened = 0;

function changevaropened() {
  if (opened) {
    opened = 0;
  } else {
    opened = 1;
  }
  openandclose();
}

function openandclose() {
  if (opened) {
    document.getElementById("toolbox").style.display = "none";
  } else {
    console.log("toolbox");
    document.getElementById("toolbox").style.display = "flex";

    document.getElementById("toolbox").style.top = "50px";

    document.getElementById("toolbox").style.left = "500px";
  }
}
document.getElementById("fillien").checked = true;

function checkbox() {
  console.log("checked2");
  if (document.getElementById("fillien").checked) {
    document.getElementById("filimglien").style.display = "block";
    document.getElementById("ressortimglien").style.display = "none";
    document.getElementById("ressortlien").checked = false;

    document.getElementById("tbklien").style.display = "none";
  } else {
    document.getElementById("fillien").checked = true;
  }
}
function checkbox1() {
  if (document.getElementById("ressortlien").checked) {
    document.getElementById("filimglien").style.display = "none";

    document.getElementById("ressortimglien").style.display = "block";
    document.getElementById("tbklien").style.display = "flex";

    document.getElementById("fillien").checked = false;
  } else {
    document.getElementById("ressortlien").checked = true;
  }
}
document.getElementById("filancrage").checked = true;

function checkbox2() {
  if (document.getElementById("filancrage").checked) {
    document.getElementById("ressortancrage").checked = false;

    document.getElementById("tbkancrage").style.display = "none";

    document.getElementById("ressortimgancrage").style.display = "none";

    document.getElementById("filimgancrage").style.display = "block";
  } else {
    document.getElementById("filancrage").checked = true;
  }
}
function checkbox3() {
  if (document.getElementById("ressortancrage").checked) {
    document.getElementById("tbkancrage").style.display = "flex";
    document.getElementById("filancrage").checked = false;
    document.getElementById("ressortimgancrage").style.display = "block";
    document.getElementById("filimgancrage").style.display = "none";
  } else {
    document.getElementById("ressortancrage").checked = true;
  }
}

/* var popup = document.getElementById("popup");
function popupmessages1() {
  setTimeout(() => {
    popup.style.top = "400px";
    popup.style.opacity = "1";
    setTimeout(() => {
      popup.style.top = "500px";
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.style.top = "200px";
      }, 500);
    }, 500);
  }, 500);
}
 */

//changement des couleurs des images de la toolbox
const colorpickerboule = document.getElementById("colorpickertb");
const bouledivimg = document.getElementById("bouleimg");

bouledivimg.style.backgroundColor = colorpickerboule.value;
colorpickerboule.oninput = function () {
  bouledivimg.style.backgroundColor = colorpickerboule.value;
};

const colorpickerlien = document.getElementById("liencouleur");

const liendivimg = document.getElementById("filimglien");
const ressortdivimg2 = document.getElementsByClassName("testlienl");
const ressortdivimg = document.getElementsByClassName("testlienl2");
console.log(ressortdivimg2);

colorpickerlien.oninput = function () {
  liendivimg.style.backgroundColor = colorpickerlien.value;

  for (let i = 0; i < ressortdivimg2.length; i++) {
    ressortdivimg2[i].style.borderColor = colorpickerlien.value;
  }
  for (let i = 0; i < ressortdivimg.length; i++) {
    ressortdivimg[i].style.borderColor = colorpickerlien.value;
  }
};

const colorpickerancrage = document.getElementById("ancragecouleur");

const liendivimgancrage = document.getElementById("filimgancrage");
const bouleancrage1 = document.getElementById("bouleancrage1");
const bouleancrage2 = document.getElementById("bouleancrage2");
const ressortdivimg2ancrage = document.getElementsByClassName("testliena");
const ressortdivimgancrage = document.getElementsByClassName("testliena2");
console.log(ressortdivimg2ancrage);

colorpickerancrage.oninput = function () {
  liendivimgancrage.style.backgroundColor = colorpickerancrage.value;
  bouleancrage1.style.backgroundColor = colorpickerancrage.value;
  bouleancrage2.style.backgroundColor = colorpickerancrage.value;
  for (let i = 0; i < ressortdivimg2ancrage.length; i++) {
    ressortdivimg2ancrage[i].style.borderColor = colorpickerancrage.value;
  }
  for (let i = 0; i < ressortdivimgancrage.length; i++) {
    ressortdivimgancrage[i].style.borderColor = colorpickerancrage.value;
  }
};

//function en rapport avec la navbar de la toolbox
let minimizedinfo = 1;
function minimizeinfo() {
  miniinfo();
  if (minimizedinfo) {
    minimizedinfo = 0;
  } else {
    minimizedinfo = 1;
  }
}

function miniinfo() {
  if (minimizedinfo) {
    document.getElementById("elementboxinformation").style.display = "none";
    document.getElementById("informationpage").style.height = "30px";
  } else {
    document.getElementById("elementboxinformation").style.display = "flex";
    document.getElementById("informationpage").style.height = "160px";
  }
}

function closeinfo() {
  document.getElementById("informationpage").style.display = "none";
  opened2 = 1;
}

dragElement2(document.getElementById("informationpage")); //functions pour permettre le deplacement de la toolbox

function dragElement2(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("infotoolbox")) {
    document.getElementById("infotoolbox").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
let opened2 = 1;

function changevaropened2() {
  if (opened2) {
    opened2 = 0;
  } else {
    opened2 = 1;
  }
  openandclose2();
}

function openandclose2() {
  if (opened2) {
    document.getElementById("informationpage").style.display = "none";
  } else {
    document.getElementById("informationpage").style.display = "flex";
    document.getElementById("informationpage").style.top = "50px";

    document.getElementById("informationpage").style.left = "200px";
  }
}

//play pause button

const sssss = document.querySelector(".playpause");
let playpause = 0;

sssss.addEventListener("click", () => {
  sssss.classList.toggle("playing");

  if (!paused) {
    pausengine();
  } else {
    unpauseengine();
  }
});
document.body.onkeydown = function (e) {
  if (e.keyCode == 32) {
    sssss.classList.toggle("playing");
    console.log();

    if (!paused) {
      pausengine();
    } else {
      unpauseengine();
    }
  }
};

function pausengine() {
  paused = true;

  for (let i = 0; i < Composite.allBodies(world).length; i++) {
    Composite.allBodies(world)[i].isStatic = true;
  }
}

function unpauseengine() {
  paused = false;
  for (let i = 0; i < Composite.allBodies(world).length; i++) {
    if (Composite.allBodies(world)[i].label !== "wall") {
      Composite.allBodies(world)[i].isStatic = false;
    }
  }
}

//calcul des distances et remplissage des tableaux

setInterval(() => {
  let ox, oy;
  if (bodyinformation != undefined) {
    for (let i = 0; i < Composite.allConstraints(world).length; i++) {
      if (
        Composite.allConstraints(world)[i].bodyA == bodyinformation ||
        Composite.allConstraints(world)[i].bodyB == bodyinformation
      ) {
        if (Composite.allConstraints(world)[i].label == "anchor") {
          ox = Composite.allConstraints(world)[i].pointA.x;
          oy = Composite.allConstraints(world)[i].pointA.y;
        }
      }
    }
    let angle = Math.atan2(
      oy - bodyinformation.position.y,
      ox - bodyinformation.position.x
    );

    document.getElementById("span1").innerHTML =
      parseFloat(bodyinformation.speed).toFixed(2) + " m/s";
    document.getElementById("span2").innerHTML =
      parseFloat((angle * 180) / Math.PI + 180).toFixed(4) + " °";
    document.getElementById("span3").innerHTML =
      parseFloat(bodyinformation.mass).toFixed(2) + " g";
  }
}, 100);

class save {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

let bodiessaved = [];
let databody = [];
let constraintsaved = [];
function sauvegarder() {
  bodiessaved = [];
  constraintsaved = [];
  databody = [];
  for (let i = 0; i < Composite.allBodies(world).length; i++) {
    if (Composite.allBodies(world)[i].label !== "wall") {
      bodiessaved.push(
        new save(
          Composite.allBodies(world)[i].position.x,
          Composite.allBodies(world)[i].position.y,
          Composite.allBodies(world)[i]
        )
      );
      databody.push(Composite.allBodies(world)[i]);
    }
  }
  for (let i = 0; i < Composite.allConstraints(world).length; i++) {
    if (Composite.allConstraints(world)[i].label !== "Mouse Constraint") {
      constraintsaved.push(Composite.allConstraints(world)[i]);
    }
  }
  console.log(bodiessaved);
  console.log(constraintsaved);
}

function reset() {
  let result = databody.filter((x) => !Composite.allBodies(world).includes(x));
  let contraiteresult = constraintsaved.filter(
    (x) => !Composite.allConstraints(world).includes(x)
  );
  console.log(contraiteresult);
  for (let i = 0; i < contraiteresult.length; i++) {
    Composite.add(world, contraiteresult[i]);
  }
  for (let i = 0; i < result.length; i++) {
    {
      Composite.add(world, result[i]);
    }
  }
  for (let i = 0; i < bodiessaved.length; i++) {
    Matter.Body.setPosition(bodiessaved[i].data, {
      x: bodiessaved[i].x,
      y: bodiessaved[i].y,
    });
    Matter.Body.setAngularVelocity(bodiessaved[i].data, 0);
    Matter.Body.setVelocity(bodiessaved[i].data, { x: 0, y: 0 });
  }
}

let clickedcreationcarre = 0;

function Creationcarre() {
  if (
    document.getElementById("rayoncreationrond").value > 10 &&
    document.getElementById("rayoncreationrond").value <= 200
  ) {
    console.log(document.getElementById("rayoncreationrond").value);
    calculrond(document.getElementById("rayoncreationrond").value);
    console.log(clickedcreation);
    if (clickedcreation == 0) {
      clickedcreation = 1;

      document.getElementById("rond").style.backgroundColor =
        document.getElementById("colorpickertb").value;
      document.getElementById("rond").style.borderColor = "black";
      document.getElementById("rond").style.display = "block";
    } else {
      clickedcreation = 0;
    }
  } else {
    if (document.getElementById("rayoncreationrond").value < 10) {
      noobjectselection("Rayon trop petit");
    } else {
      noobjectselection("Rayon trop grand");
    }
  }
}
function creernoncarre() {
  clickedcreation = 0;
  document.getElementById("rond").style.display = "none";
}
