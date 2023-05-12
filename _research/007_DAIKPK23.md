---
paper_name: State Constrained Stochastic Optimal Control for Continuous and Hybrid Dynamical Systems Using DFBSDE
paper_author: Bolun Dai, Andrew Papanicolaou, Prashanth Krishnamurthy, Farshad Khorrami
paper_venue: Automatica (Accepted)
paper_link: "https://arxiv.org/abs/2305.06499"
video_link: None
poster_link: None
---
We develop a computationally efficient learning-based forward-backward stochastic differential equations (FBSDE) controller for both continuous and hybrid dynamical (HD) systems subject to stochastic noise and state constraints. Solutions to stochastic optimal control (SOC) problems satisfy the Hamilton–Jacobi–Bellman (HJB) equation. Using current FBSDE-based solutions, the optimal control can be obtained from the HJB equations using deep neural networks (e.g., long short-term memory (LSTM) networks). To ensure the learned controller respects the constraint boundaries, we enforce the state constraints using a soft penalty function. In addition to previous works, we adapt the deep FBSDE (DFBSDE) control framework to handle HD systems consisting of continuous dynamics and a deterministic discrete state change. We demonstrate our proposed algorithm in simulation on a continuous nonlinear system (cart-pole) and a hybrid nonlinear system (five-link biped).