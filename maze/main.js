var cols;
var rows;
var w = 10;

var grid = new Array();
var current, next;
var pilha = [];

function setup()
{
	createCanvas(1000,1000);
	cols = width/w;
	rows = height/w;

	for(var i=0;i<rows;i++)
	{
		grid[i] = new Array();
		for(j=0;j<cols;j++)
		{
			grid[i][j] = 0;
		}
	}
	for(var i=0;i<rows;i++)
	{
		for(var j=0;j<cols;j++)
		{
			//grid.push(new Cell(i, j));
			grid[i][j] = new Cell(i, j);
			//console.log(grid[i][j]);
		}
	}
	current = grid[0][0];
	current.visited = true;

	//grid[0].visited = false;
}

function removewall(a, b)
{
	var y = a.i-b.i;
	var x = a.j-b.j;

	if(x==1)
	{
		a.walls[0]=false;
		b.walls[2]=false;
	}
	if(x==-1)
	{
		a.walls[2]=false;
		b.walls[0]=false;
	}
	if(y==1)
	{
		a.walls[3]=false;
		b.walls[1]=false;
	}
	if(y==-1)
	{
		a.walls[1]=false;
		b.walls[3]=false;
	}

}

function draw()
{
	//frameRate(5);
	background(51);
//	current.visited = true;

	for(var i=0;i<rows;i++)
	{
		for(var j=0;j<cols;j++)
		{
			grid[i][j].show();
		}
	}
	next = current.checaVizinhos();
	if(next)
	{
		next.visited=true;
		pilha.push(current);
		removewall(current,next);
		current = next;
	}
	else
	{
		current = pilha.pop();
	}
	current.highlight();
	//console.log(next);
	//current = current.checaVizinhos();
}

function Cell(i, j)
{
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;


	this.highlight = function()
	{
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill('green');
		rect(x,y,w,w);
	}

	this.checaVizinhos = function() //retorna um vizinho aleatorio se existir
	{
		i = constrain(this.i, 0, rows);
		j = constrain(this.j, 0, height);

		var vizinhos = [];

		if(i-1>0)
		{
			topo = grid[i-1][j];
		}
		else
		{
			topo = -1;
		}
		if(j+1<cols)
		{
			direita = grid[i][j+1];
		}
		else
		{
			direita = -1;
		}
		if(i+1<rows)
		{
			baixo = grid[i+1][j];
		}
		else
		{
			baixo = -1;
		}
		if(j-1>0)
		{
			esquerda = grid[i][j-1];
		}
		else
		{
			esquerda = -1;
		}


		if(topo!=-1 && topo.visited==false)
		{
			vizinhos.push(topo);
		}
		if(direita!=-1 && direita.visited==false)
		{
			vizinhos.push(direita);
		}
		if(baixo!=-1 && baixo.visited==false)
		{
			vizinhos.push(baixo);
		}
		if(esquerda!=-1 && esquerda.visited==false)
		{
			vizinhos.push(esquerda);
		}

		if(vizinhos.length>0)
		{
			var r = floor(random(0, vizinhos.length));
			return vizinhos[r];
		}
		else
		{
			return undefined;
		}
		//console.log(vizinhos);

	}

	this.show = function()
	{
		x = this.i*w;
		y = this.j*w;

		if(this.visited==true)
		{
			fill('red');
			noStroke();
			rect(x,y,w,w);
		}
		else
		{
			noFill();
		}
		stroke(255);
		if(this.walls[0])
		{
			line(x, y, x+w, y);
		}
		if(this.walls[1])
		{
			line(x+w, y, x+w, y+w);
		}
		if(this.walls[2])
		{
			line(x, y+w, x+w, y+w);
		}
		if(this.walls[3])
		{
			line(x, y, x, y+w);
		}
	}
}