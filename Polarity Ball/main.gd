extends Node3D


# Called when the node enters the scene tree for the first time.
var time
var t_spawn
var counter
func _ready():
	randomize()
	time=0
	t_spawn=1.0
	counter=0
	# Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var coin_scene=preload("res://coin.tscn")
	time+=delta
	if time>=t_spawn:
		add_child(coin_scene.instantiate())
		time=0
	var t_sec=Time.get_ticks_usec()/1000000.0
	if floor((t_sec)/30.0)>counter:
		counter+=1
		t_spawn/=2
