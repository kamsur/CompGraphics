extends RigidBody3D


# Called when the node enters the scene tree for the first time.
func _ready():
	position.x=(randf()*2.0-1.0)*50.0
	position.y=25.0
	position.z=(randf()*2.0-1.0)*sqrt(pow(50,2)-pow(position.x,2))
	# Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if position.y<=-10.0:
		queue_free()

func _physics_process(delta):
	var player=get_parent().get_node("Player")
	var direction=(player.position).direction_to(position)
	var distance_sq=position.distance_squared_to(player.position)
	var force=(direction*(1/distance_sq)*1000)
	apply_central_force(force)
