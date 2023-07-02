---
paper_name: Safe Navigation and Obstacle Avoidance Using Differentiable Optimization Based Control Barrier Functions
paper_author: Bolun Dai, Rooholla Khorrambakht, Prashanth Krishnamurthy, Vinícius Gonçalves, Anthony Tzes, Farshad Khorrami
paper_venue: IEEE Robotics and Automation Letters (Accepted)
paper_link: "https://arxiv.org/abs/2304.08586"
video_link: "https://youtu.be/MgFF3Xjnlpc"
poster_link: None
---
Control barrier functions (CBFs) have been widely applied to safety-critical robotic applications. However, the construction of control barrier functions for robotic systems remains a challenging task. Recently, collision detection using differentiable optimization has provided a way to compute the minimum uniform scaling factor that results in an intersection between two convex shapes and to also compute the Jacobian of the scaling factor. In this paper, we propose a framework that uses this scaling factor, with an offset, to systematically define a CBF for obstacle avoidance tasks. We provide a theoretical analysis that proves the continuity of the proposed CBF. Empirically, we show that the proposed CBF is continuously differentiable, and the resulting optimal control problem is computationally efficient, which makes it applicable for real-time robotic control. We validate our approach, first using a 2D mobile robot example, then on the Franka-Emika Research 3 (FR3) robot manipulator both in simulation and experiment.
