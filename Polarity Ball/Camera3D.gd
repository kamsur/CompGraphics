extends Camera3D


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var time=Time.get_ticks_usec()/1000000.0
	position.x=50*sin(2*PI*time/30.0)
	position.y=25.0
	position.z=50*cos(2*PI*time/30.0)
	var parent=get_parent()
	var player=parent.get_node("Player")
	var pos=player.position
	look_at(pos,Vector3.UP)
