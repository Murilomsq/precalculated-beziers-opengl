#pragma once

#include <glm/glm/glm.hpp>

class BezierControlPoint {
	public:
		glm::mat4 modelMatrix;
		float* vertex;
		float clickRadius = 0.1f;

		BezierControlPoint() {

		}
		BezierControlPoint(float* vertex) {
			this-> vertex = vertex;
		}

		// Moving vertex to be at world space coords
		void MoveVertexWorld(glm::vec3 wSpacePoint) {
			glm::vec3 localSpacePoint = glm::inverse(modelMatrix) * glm::vec4(wSpacePoint, 1.0f);

			vertex[0] = localSpacePoint[0];
			vertex[1] = localSpacePoint[1];
			vertex[2] = localSpacePoint[2];
		}

		bool intesectionTestSphere(glm::vec3 ray_wor, glm::mat4 viewMatrix) {
			//t = -b +-sqrt(b² - c)

			glm::vec3 center = modelMatrix * glm::vec4(vertex[0], vertex[1], vertex[2], 1.0f);
			glm::mat4 viewMinusOne = glm::inverse(viewMatrix);
			glm::vec3 camPos = glm::vec3(viewMinusOne[3][0], viewMinusOne[3][1], viewMinusOne[3][2]);

			float b = glm::dot(ray_wor, (camPos - center));
			float c = glm::dot((camPos - center), (camPos - center)) - (clickRadius * clickRadius);

			if (b * b - c <= 0) {
				return false;
			}
			return true;
		}
};
