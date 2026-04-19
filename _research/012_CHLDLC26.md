---
paper_name: Safety-Critical Dynamic Motion Generation for Manipulators Using Differentiable Distance Fields in Configuration Space
paper_author: Xuemin Chi, Jihao Huang, Yiming Li, Bolun Dai, Zhitao Liu, Sylvain Calinon
paper_venue: International Conference on Robotics and Automation, 2026
paper_link: None
video_link: None
poster_link: None
website_link: "https://sites.google.com/view/sdfcdf-tvcbfs-qp"
---
Generating collision-free motions in dynamic environments is a challenging problem for high-dimensional robotics, particularly under real-time constraints. Control Barrier Functions (CBFs), widely utilized in safety-critical control, have shown significant potential for motion generation. However, for high-dimensional robot manipulators, existing QP formulations and CBF-based methods rely on positional information, overlooking higher-order derivatives such as velocities. This limitation may lead to reduced success rates, decreased performance, and inadequate safety constraints. To address this, we construct time-varying CBFs (TVCBFs) that consider dynamic obstacles. Our approach leverages recent developments on distance fields for articulated manipulators, a differentiable representation that enables the mapping of objects' position and velocity into the robot's joint space, offering a comprehensive understanding of the system's interactions. This allows the manipulator to be treated as a point-mass system thus simplifying motion generation tasks. Additionally, we introduce a time-varying control Lyapunov function (TVCLF) to enable whole-body contact motions. Our approach integrates the TVCBFs, TVCLF, and manipulator physical constraints within a unified QP framework. We validate our method through simulations and comparisons with state-of-the-art approaches, demonstrating its effectiveness on a 7-axis Franka arm in real-world experiments.
