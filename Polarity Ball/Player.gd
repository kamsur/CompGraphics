extends RigidBody3D


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if position.y<=-10.0:
		get_tree().paused = true

func _physics_process(delta):
	var parent=get_parent()
	var camera=parent.get_node("Camera3D")
	var transform=camera.transform.basis
	if Input.is_action_pressed("move_up"):
		var force_up=(transform*Vector3(0,0,-1)).normalized()
		force_up.y=0
		apply_central_force(force_up*100.0*delta)
	if Input.is_action_pressed("move_down"):
		var force_down=(transform*Vector3(0,0,1)).normalized()
		force_down.y=0
		apply_central_force(force_down*100.0*delta)
	if Input.is_action_pressed("move_left"):
		var force_left=(transform*Vector3(-1,0,0)).normalized()
		force_left.y=0
		apply_central_force(force_left*100.0*delta)
	if Input.is_action_pressed("move_right"):
		var force_right=(transform*Vector3(1,0,0)).normalized()
		force_right.y=0
		apply_central_force(force_right*100.0*delta)
