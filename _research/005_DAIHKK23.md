---
paper_name: Data-Efficient Control Barrier Function Refinement
paper_author: Bolun Dai, Heming Huang, Prashanth Krishnamurthy, Farshad Khorrami
paper_venue: American Control Conference (ACC) 2023
paper_link: "https://arxiv.org/abs/2303.05973"
video_link: None
poster_link: None
---
Control barrier functions (CBFs) have been widely used for synthesizing controllers in safety-critical applications. When used as a safety filter, it provides a simple and computationally efficient way to obtain safe controls from a possibly unsafe performance controller. Despite its conceptual simplicity, constructing a valid CBF is well known to be challenging, especially for high-relative degree systems under nonconvex constraints. Recently, work has been done to learn a valid CBF from data based on a handcrafted CBF (HCBF). Even though the HCBF gives a good initialization point, it still requires a large amount of data to train the CBF network. In this work, we propose a new method to learn more efficiently from the collected data through a novel prioritized data sampling strategy. A priority score is computed from the loss value of each data point. Then, a probability distribution based on the priority score of the data points is used to sample data and update the learned CBF. Using our proposed approach, we can learn a valid CBF that recovers a larger portion of the true safe set using a smaller amount of data. The effectiveness of our method is demonstrated in simulation on a unicycle and a two-link arm.