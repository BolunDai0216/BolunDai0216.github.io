--- 
page-type: blog-post 
title: Operations that preserve convexity
description: By Bolun Dai | Jan 14th 2021
class: convex-opt
link: None
text: A list of operations that preserves convexity on both convex sets and functions.
--- 

First we summarize the operations that preserves convexity for convex sets, which means for a convex set $$C$$ after performing an operation the result is still a convex set. A convex set $$C$$ is defined as for $$x, y\in C$$ we have $$tx + (1-t)y\in C$$ for all $$0\leq t\leq1$$.

| Operation               | Detailed Description                                                          |
|:------------------------|:------------------------------------------------------------------------------|
| Intersection            | $$\widetilde{C} = C_1\bigcap C_2$$, where $$C_1$$ and $$C_2$$ are convex sets |
| Scaling and Translation | $$\widetilde{C} = \{ax + b: x\in C\}$$, where $$C$$ is a convex set           |
| Affine Images           | $$\mathcal{D} = \{f(x): x\in C\}$$, where $$C$$ is a convex set               |
| Affine Preimages        | $$C = \{x: f(x)\in \mathcal{D}\}$$, where $$\mathcal{D}$$ is a convex set     |

Then we summarize the operations that preserve convexity for convex functions. A convex function $$f:\mathbb{R}^n\rightarrow\mathbb{R}$$ needs to satisfy two criterias: the domain of $$f$$, $$\mathrm{dom}(f)\subseteq\mathbb{R}^n$$ needs to be convex; for $$x, y\in\mathrm{dom}(f)$$ we have $$f(tx + (1-t)y)\leq tf(x) + (1-t)f(y), \forall 0\leq t\leq 1$$.

| Operation                      | Detailed Description                                                                                                                                 |
|:-------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Nonnegative Linear Combination | If $$f_i$$, $$i = 1, \cdots, m$$, are convex functions then $$\forall a_i\geq0$$ we have $$\displaystyle\sum_{i=1}^{m}a_if_i$$ as a convex function. |
| Pointwise Maximization         | If $$f_s$$ is convex $$\forall s\in S$$, then $$\displaystyle f(x) = \max_{s\in S}f_s(x)$$ is also a convex function.                                |
| Partial Minimization           | For $$g(x, y)$$ being convex in $$x$$, $$y$$ and $$C$$ being a convex set, we have $$\displaystyle f(x)=\min_{y\in C}g(x, y)$$ as a convex function  |
| Affine Composition             | If $$f(x)$$ is a convex function, then $$g(x) = f(Ax + b)$$ is also a convex function.                                                               |
| General Composition            | See proof below.                                                                                                                                     |

For a convex function it satisfies two conditions.

The **first-order condition** states that for a differentiable function $$f(\cdot)$$, it is convex only is $$\mathrm{dom}(f)\subseteq\mathbb{R}^n$$ is a convex set and

$$f(y)\geq f(x) + \nabla f^T(x)(y - x)$$

for all $$x, y\in\mathrm{dom}(f)$$.

The **second-order condition** states that for a two time differentiable function $$f(\cdot)$$, it is convex only is $$\mathrm{dom}(f)\subseteq\mathbb{R}^n$$ is a convex set and $$\nabla^2 f(x)\succeq0$$ for all $$x\in\mathrm{dom}(f)$$.

We will use the second-order condition to find what kinds of functions preserves convexity under a general composition. The general composition can be denoted as $$f = h\circ g$$ or $$f(x) = h(g(x))$$. To simplify the problem we can let $$f:\mathbb{R}\rightarrow\mathbb{R}$$, then we have

$$\begin{align*}
f^{\prime\prime}(x) &= [h^\prime(g(x))g^\prime(x)]^\prime\\
&= [h^{\prime\prime}(g(x))g^\prime(x)]g^\prime(x) + h^\prime(g(x))g^{\prime\prime}(x)\\
&= h^{\prime\prime}(g(x))g^\prime(x)^2 + h^\prime(g(x))g^{\prime\prime}(x).
\end{align*}$$

To guarantee convexity we need $$f^{\prime\prime}(x) \geq 0$$. Thus, if the following conditions hold then $$f(x)$$ is convex:
- if $$h$$ is convex and nondecreasing, $$g$$ is convex;
- if $$h$$ is convex and nonincreasing, $$g$$ is concave.
  
<d-byline></d-byline>

<p class="citation">
    Credit to Ryan Tibshirani, powered by <a href="https://www.mathjax.org">
    <img title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" style="border:0;" alt="Powered by MathJax" />
    </a>
</p>