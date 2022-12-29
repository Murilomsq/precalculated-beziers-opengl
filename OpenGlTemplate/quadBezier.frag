#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec2 TexCoords;

void main()
{

    
    // Gradients  
    vec2 px = dFdx(TexCoords); 
    vec2 py = dFdy(TexCoords);  
    // Chain rule   
    float fx = (2*TexCoords.x)*px.x - px.y; 
    float fy = (2*TexCoords.x)*py.x - py.y;  
    // Signed distance    
    float sd = (TexCoords.x*TexCoords.x - TexCoords.y)/sqrt(fx*fx + fy*fy); 
    // Linear alpha   
    float alpha = 0.5 - sd;  


    if(alpha > 1)
    {
        FragColor = vec4(1.0f,1.0f, 1.0f, 1f);
    }
    else if(alpha < 0)
    {
        discard;
    }
    else
    {
        FragColor = vec4(1.0f,1.0f, 1.0f, alpha);
    }
    
}