--- 
page-type: blog-post 
title: Relationship between global and local minima in convex optimization problems
description: By Bolun Dai | Jan 12th 2021
class: convex-opt
link: None
text: As topic.
--- 

This blog shows the proof that for a convex optimization problem such as

$$\begin{align*}
\min_{x\in\mathcal{D}}&\ f(x)\\
\mathrm{s.t.}&\ g_i(x) \leq 0\\
&\ h_i(x) = 0,
\end{align*}$$

a local minimum is also a global minimum. If a point $$x$$ is a local minimum, then in a small local region, any other point $$y$$ will make the objective function output a larger value, i.e. $$f(x) < f(y)$$. In mathematical terms, no matter how weirdly shaped the local region is we can always find a circle that inscribes the edges. Therefore we can denote the local region where $$x$$ is the local minimum as $$\|x - y\|_2\leq\rho$$. For the global minimum, then any point $$y$$ in the domain $$\mathcal{D}$$ will make the objective function output a larger value, i.e. $$f(y)> f(x)$$.

We can prove this by contradiction. The statement is

$$\mathrm{x\ is\ a\ local\ minimum}\rightarrow\mathrm{x\ is\ the\ global\ minimum},$$

to contradict it we simply need to assume $$x$$ is not the global minimum. If $$x$$ is not the global minimum than we can find a point $$z\in\mathcal{D}$$, such that $$f(x) > f(z)$$. Since $$x$$ is still a local minimum, having $$f(x) > f(z)$$ is saying that $$\|x - z\|_2 > \rho$$. We define a point $$m$$ such that $$m = tx + (1-t)z$$, where $$0 \leq t \leq1 $$.

First, we can say that $$y\in\mathcal{D}$$, because $$\mathcal{D}$$ is a convex set. This comes from the definition of convex sets: for a convex set $$C$$, if $$x, y\in C$$ then for $$0\leq t\leq1$$ we have $$tx + (1-t)y\in C$$.

Second, we can say that $$m$$ is feasible, in other words $$g_i(m) \leq 0$$ and $$h_i(m) = 0$$, let's prove this. For a problem to be a convex optimization problem we need the objective function $$f(\cdot)$$ and inequality constraints $$g_i(\cdot)$$ to be convex functions. Since $$g_i(\cdot)$$ is a convex function we have

$$\begin{align*}
g_i(m) &= g_i(tx + (1-t)z)\\
&\leq tg_i(x) + (1-t)g_i(z)\\
&\leq t\cdot0 + (1-t)\cdot0\\
&= 0.
\end{align*}$$

Another criterion to be a convex optimization problem is the equality constraint has to be an affine function, i.e. $$h_i(x) = a_i^Tx + b_i$$. Thus we have

$$\begin{align*}
h_i(m) &= h_i[tx + (1-t)z]\\
&= a_i^T[tx + (1-t)z] + b_i\\
&= ta_i^Tx + (1-t)a_i^Tz + tb_i + (1-t)b_i\\
&= t[a_i^Tx + b_i] + (1-t)[a_i^Tz + b_i]\\
&= t\cdot0 + (1-t)\cdot0\\
&= 0.
\end{align*}$$

Since $$m$$ satisfies the inequality and equality constraints we say $$m$$ is feasible.

If we pick some $$t$$ that is large enough (some value close to 1 would work) such that $$\|x - m\|_2\leq\rho$$. Since $$m$$ is in the local region of $$x$$ it should have $$f(m) > f(x)$$. Since $$f(\cdot)$$ is a convex function we can have

$$\begin{align*} f(m) &=f[tx + (1-t)z]\\ &\leq tf(x) + (1-t)f(z)\\
&\leq tf(x) + (1-t)f(x)\\ &=f(x).
\end{align*}$$

This shows that $$f(m) \leq f(x)$$, which contradicts with the fact that $$x$$ is a local minimum. Therefore, we can conclude that if $$x$$ is a local minimum then it is also a global minimum.

<d-byline></d-byline>

<p class="citation">
    Credit to Ryan Tibshirani, powered by <a href="https://www.mathjax.org">
    <img title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" style="border:0;" alt="Powered by MathJax" />
    </a>
</p>