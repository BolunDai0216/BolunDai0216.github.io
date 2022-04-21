---
paper_name: State Constrained Stochastic Optimal Control Using LSTM's
paper_author: Bolun Dai, Prashanth Krishnamurthy, Andrew Papanicolaou, Farshad Khorrami
paper_venue: American Control Conference (ACC) 2021
paper_link: "https://arxiv.org/abs/2104.02135"
video_link: "https://www.youtube.com/watch?v=QYoX6aG3oIk"
poster_link: "Research Posters/ACC 2021 Poster.pdf"
---
In this paper, we propose a new methodology for state constrained stochastic optimal control (SOC) problems. The solution is based on past work in solving SOC problems using forward-backward stochastic differential equations (FBSDE). Our approach in solving the FBSDE utilizes a deep neural network (DNN), specifically Long Short-Term Memory (LSTM) networks. LSTMs are chosen to solve the FBSDE to address the curse of dimensionality, non-linearities, and long time horizons. In addition, the state constraints are incorporated using a hard penalty function, resulting in a controller that respects the constraint boundaries. Numerical instability that would be introduced by the penalty function is dealt with through an adaptive update scheme. The control design methodology is applicable to a large class of  control problems. The performance and scalability of our proposed algorithm are demonstrated by numerical simulations.