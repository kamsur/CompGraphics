precision mediump float;

uniform mat4 cameraMatrixInverse;

uniform vec3 color;
uniform vec3 lightPosition;
uniform float shiny;

uniform bool ambient;
uniform bool diffuse;
uniform bool specular;


// TODO 5.2a)	Define a varying variable with
//				the same name as in the vertex
//				shader to pass the normal.
varying vec3 normal;

// TODO 5.2a)	Define a varying variable with
//				the same name as in the vertex
//				shader to pass the position.
varying vec3 worldPos;



void main(void)
{

	// I_in and I_amb are white, so you can ignore them!
	vec3 k_amb = 0.3 * color;
	vec3 k_diff = 0.5 * color;
	vec3 k_spec = 0.4 * vec3(1, 1, 1);
	
	vec3 color_ambient, color_diffuse, color_specular;
	

	////////////////////////////////
    ////////  ambient term  ////////
    ////////////////////////////////
	color_ambient = k_amb;

	////////////////////////////////
	////////  diffuse term  ////////
	////////////////////////////////

	// TODO 5.2a)	Compute the diffuse color like shown
	//				in the lecture. Use k_diff.
	//				For the dot product, you need the normal
	//				and the vector from the fragment to the
	//				light source. Both vectors have to be
	//				normalized. Note that the varying variables
	//				normalized in the vertex shader do not have
	//				to be still normalized in the fragment shader.
	vec3 l = lightPosition - worldPos;
	l = normalize(l);
	vec3 norm = normalize(normal);
	color_diffuse = k_diff*(clamp(dot(norm,l),0.0,1.0));
	
	/////////////////////////////////
	////////  specular term  ////////
	/////////////////////////////////
	
	// TODO 5.2b)	Compute the specular color like shown
	//				in the lecture. Use k_spec and shiny.
	//				For the dot product, you need the reflection
	//				vector (computed from the normal and the vector
	//				to the light) and the view vector. To calculate
	//				the camera position, transform the camera
	//				position in camera space (easy!) to world space
	//				using the inverse camera matrix given as a 
	//				uniform.
	float ndl = clamp( dot(norm,l), 0.0, 1.0 );
	vec3 r = 2.0 * ndl*norm-l;
	vec4 cameraPosition4 = cameraMatrixInverse *vec4(0,0,0,1);
	vec3 cameraPosition = vec3(cameraPosition4[0]/cameraPosition4[3],cameraPosition4[1]/cameraPosition4[3],cameraPosition4[2]/cameraPosition4[3]);
	vec3 v = cameraPosition- worldPos;
	v = normalize(v);
	float vdr = clamp( dot(v,r), 0.0, 1.0 );
	color_specular = k_spec*(pow(vdr,shiny));


	///////////////////////////////////
    ////////  resulting color  ////////
    ///////////////////////////////////
	vec3 color_result = vec3(0);
    if(ambient) color_result += color_ambient;
    if(diffuse) color_result += color_diffuse;
    if(specular) color_result += color_specular;
	gl_FragColor = vec4(color_result, 1.0);
}
