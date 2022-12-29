#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec2 TexCoords;

void main()
{
    float u = TexCoords.x;
    float v = TexCoords.y;
    float Fuv = (u * u) - v;

    if(Fuv<0)
    {
        FragColor = vec4(1.0f);
        //FragColor = vec4(TexCoords.x, 0.0f, 0.0f, 1.0f);
    }
    else
    {
        discard;
    }
    
}