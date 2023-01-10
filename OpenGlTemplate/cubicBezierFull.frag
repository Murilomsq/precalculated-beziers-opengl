#version 330 core
out vec4 FragColor;

in vec3 TexCoords;

void main()
{

    vec3 px = dFdx(TexCoords);
    vec3 py = dFdy(TexCoords);

    // Chain rule   
    //float fx = (2*TexCoords.x)*px.x - px.y; 
    float fx = 3 * TexCoords.x * TexCoords.x * px.x - TexCoords.y*px.y - TexCoords.z * px.z;
    float fy = 3 * TexCoords.x * TexCoords.x * py.x - TexCoords.y*py.y - TexCoords.z * py.z; 

    // Signed distance    
    float sd = (pow(TexCoords.x, 3) - TexCoords.y * TexCoords.z - TexCoords.y)/sqrt(fx*fx + fy*fy); 

    // Linear alpha   
    float alpha = 1-sd;  
    
    
    if(pow(TexCoords.x, 3) - TexCoords.y * TexCoords.z - TexCoords.y < 0)
    {
       FragColor = vec4(pow(alpha,5),1.0f, 1.0f, 1.0f);
    }
    else if(alpha < 0)
    {
        discard;
    }

    
  

    
}