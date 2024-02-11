---
paper_name: DiffOcclusion - Differentiable Optimization Based Control Barrier Functions for Occlusion-Free Visual Servoing
paper_author: Shiqing Wei, Bolun Dai, Rooholla Khorrambakht, Prashanth Krishnamurthy, Farshad Khorrami
paper_venue: IEEE Robotics and Automation Letters
paper_link: "https://ieeexplore.ieee.org/document/10430369"
video_link: None
poster_link: None
---
The visibility (possibly partial) of some image features is crucial to a broad class of visual servoing-based control. In this work, we consider the setting of image-based visual servoing (IBVS) and address the fundamental problem of keeping a moving object with an unknown motion profile in the field of view while ensuring it remains unobstructed by obstacles. Assuming that the projections of the target and obstacles are both convex polygons, we propose a systematic method for circumscribing these polygons by strictly convex shapes with tunable accuracy. We prove that the minimal scaling factor such that two convex shapes intersect is continuously differentiable with respect to their vertex coordinates. Then, we formulate a control barrier function (CBF) based on this minimal scaling factor and incorporate a motion observer into occlusion-free visual servoing. The effectiveness of our method is validated through both simulation studies and experimental validation on the Franka Research 3 robotic arm.
