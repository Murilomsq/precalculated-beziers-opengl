#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec2 TexCoords;

void main()
{
    
    /// Instead of evaluating the fragment distance to the bezier line (expensive to evaluate a poly each call)
    /// we use an approximation by getting the gradients of the [u,v] coord system by treating TexCoords vector as a f(x,y)

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


    float thickness = 3;



    // discarding inside the function && outside the line
    if(alpha > thickness + 1)
    {
        discard;
    }
    // drawing inside the line
    else if(alpha <= 3 && alpha >= 1)
    {
        FragColor = vec4(1.0f,1.0f, 1.0f, 1.0f);
        return;
    }
    //discarding outside the function
    else if(alpha < 0)
    {
        discard;
    }
    else if(alpha > thickness) // antialiasing from inside the function
    {
        FragColor = vec4(1.0f,1.0f, 1.0f, thickness + 1 - alpha);
    }
   
    else // antialiasing from outside the function
    {
        FragColor = vec4(1.0f,1.0f, 1.0f, alpha);
        return;
    }
    
}