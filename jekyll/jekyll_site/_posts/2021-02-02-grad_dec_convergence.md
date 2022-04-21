--- 
page-type: blog-post 
title: Gradient Descent Convergence Analysis
description: By Bolun Dai | Feb 2nd 2021
class: convex-opt
link: None
text: Some notes on gradient descent covergence analysis, along with its proof.
--- 

This blog post will dive into the convergence analysis of gradient descent. The gradient descent algorithm solves problem in the form of

$$\min_{x}\ \ f(x).$$

Assume that $$f$$ is convex and differentiable, with $$\mathrm{dom}(f) = \mathbb{R}^n$$. Additionally we assume the gradient of $$f$$, denoted as $$\nabla{f}$$ is Lipschitz continuous with constant $$L>0$$

$$\|\nabla{f}(x) - \nabla{f}(y)\|_2\leq L\|x - y\|_2.$$

Under a fixed step size $$t\leq1/L$$ we can have

$$f(x^{(k)}) - f(x^*) \leq \frac{\|x^{(0)} - x^*\|_2^2}{2tk},$$

where $$x^{(k)}$$ is the estimation of the solution at the $$k$$-th iteration and $$x^*$$ is the true solution the problem. Using the big O notation we can say that gradient descent, under the above assumptions, has a convergence rate of $$O(1/k)$$. In other words, it needs $$O(1/\epsilon)$$ iterations to achieve $$f(x^{(k)}) - f(x^*) \leq \epsilon$$. We will prove this below.

We first need to acknowledge from $$\nabla{f}$$ being Lipschitz continuous with constant $$L>0$$ we can prove, for all $$x$$ and $$y$$ we have

$$f(y) \leq f(x) + \nabla{f}(x)^T(y - x) + \frac{L}{2}\|y-x\|_2^2,$$

the proof is given in <a href="/2021/02/10/part_of_grad_desc_proof.html">another post</a>, here I will use it as a fact. At each gradient descent iteration we perform the update

$$x^+ = x - t\nabla{f}(x).$$

Using the above inequality we can have

$$\begin{align*}
f(x^+) &\leq f(x) + \nabla{f}(x)^T(x^+ - x) + \frac{L}{2}\|x^+-x\|_2^2\\
&= f(x) + \nabla{f}(x)^T[-t\nabla{f}(x)] + \frac{L}{2}\|-t\nabla{f}(x)\|_2^2\\
&= f(x) -t\|\nabla{f}(x)\|_2^2 + \frac{Lt^2}{2}\|\nabla{f}(x)\|_2^2\\
&= f(x) -(1-\frac{Lt}{2})t\|\nabla{f}(x)\|_2^2.
\end{align*}$$

Since we have $$t\leq1/L$$ then we have

$$\begin{align*}
t &\leq \frac{1}{L}\\
\frac{L}{2}t &\leq \frac{L}{2}\frac{1}{L}\\
\frac{Lt}{2} &\leq \frac{1}{2}\\
-\frac{Lt}{2} &\geq -\frac{1}{2}\\
1-\frac{Lt}{2} &\geq 1-\frac{1}{2}\\
-(1-\frac{Lt}{2}) &\leq -\frac{1}{2}.
\end{align*}$$

Thus we have

$$\begin{align*}
f(x^+) &\leq f(x) -(1-\frac{Lt}{2})t\|\nabla{f}(x)\|_2^2\\
&\leq f(x) -\frac{t}{2}\|\nabla{f}(x)\|_2^2.
\end{align*}$$

This says that when not at the solution it always have $$f(x^+) \leq f(x)$$, which is the equavalent of saying the solution estimation is monotonicly approaching the minimum value.

Applying the first order convexity condition at $$x$$ gives us

$$f(y) \geq f(x) + \nabla{f}(x)^T(y - x),\ \ \forall y.$$

Substituting $$y$$ with the true solution $$x^*$$ we have

$$\begin{align*}
f(x^*) &\geq f(x) + \nabla{f}(x)^T(x^* - x)\\
f(x^*) - \nabla{f}(x)^T(x^* - x) &\geq f(x)\\
f(x^*) +\nabla{f}(x)^T(x - x^*) &\geq f(x).
\end{align*}$$

From above we know $$f(x^+) \leq f(x) -\frac{t}{2}\|\nabla{f}(x)\|_2^2$$, using the above inequality
gives us

$$\begin{align*}
f(x^+) &\leq f(x) -\frac{t}{2}\|\nabla{f}(x)\|_2^2\\
&\leq f(x^*) +\nabla{f}(x)^T(x - x^*) - \frac{t}{2}\|\nabla{f}(x)\|_2^2\\
f(x^+) - f(x^*) &\leq \nabla{f}(x)^T(x - x^*) - \frac{t}{2}\|\nabla{f}(x)\|_2^2.
\end{align*}$$

Now we show a result that seems irrelavent but crucial step

$$\begin{align*}
\frac{1}{2t}\Big[\|x - x^*\|_2^2 - \|x^+ - x^*\|_2^2\Big] &= \frac{1}{2t}\Big[\|x - x^*\|_2^2 -
\|x - t\nabla{f}(x) - x^*\|_2^2\Big]\\
&= \frac{1}{2t}\Big[\|x - x^*\|_2^2 - (x - t\nabla{f}(x) - x^*)^T(x - t\nabla{f}(x) - x^*)\Big]\\
&= \frac{1}{2t}\Big[\|x - x^*\|_2^2 - (x - x^* - t\nabla{f}(x))^T(x - x^* - t\nabla{f}(x))\Big]\\
&= \frac{1}{2t}\Big[\|x - x^*\|_2^2 - \|x - x^*\|_2^2 - t^2\|\nabla{f}(x)\|_2^2 + 2t\nabla{f}(x)^T(x
- x^*)\Big]\\
&= \frac{1}{2t}\Big[- t^2\|\nabla{f}(x)\|_2^2 + 2t\nabla{f}(x)^T(x - x^*)\Big]\\
&= \nabla{f}(x)^T(x - x^*) - \frac{t}{2}\|\nabla{f}(x)\|_2^2.
\end{align*}$$

Thus we have

$$\begin{align*}
f(x^+) - f(x^*) &\leq \nabla{f}(x)^T(x - x^*) - \frac{t}{2}\|\nabla{f}(x)\|_2^2\\
&\leq \frac{1}{2t}\Big[\|x - x^*\|_2^2 - \|x^+ - x^*\|_2^2\Big].
\end{align*}$$

For the $$i$$-th iteration, we have

$$f(x^{(i)}) - f(x^*) \leq \frac{1}{2t}\Big[\|x^{(i-1)} - x^*\|_2^2 - \|x^{(i)} - x^*\|_2^2\Big].$$

Then we have

$$\begin{align*}
f(x^{(i)}) - f(x^*) + f(x^{(i-1)}) - f(x^*) &\leq \frac{1}{2t}\Big[\|x^{(i-1)} - x^*\|_2^2 -
\|x^{(i)} - x^*\|_2^2\Big] + \frac{1}{2t}\Big[\|x^{(i-2)} - x^*\|_2^2 - \|x^{(i-1)} -
x^*\|_2^2\Big]\\
&\leq \frac{1}{2t}\Big[\|x^{(i-2)} - x^*\|_2^2 -
\|x^{(i)} - x^*\|_2^2\Big].
\end{align*}$$

Therefore we can conclude

$$\begin{align*}
\sum_{i=1}^{k}\Big[f(x^{(i)}) - f(x^*)\Big] &\leq \frac{1}{2t}\Big[\|x^{(0)} - x^*\|_2^2 -
\|x^{(k)} - x^*\|_2^2\Big]\\
&\leq \frac{1}{2t}\|x^{(0)} - x^*\|_2^2.
\end{align*}$$

Recall when not at the solution we always have $$f(x^+) \leq f(x)$$. This says

$$f(x^{1}) \geq f(x^{2}) \geq \cdots \geq f(x^{k}),$$

which can be written as

$$f(x^{1}) - f(x^*) \geq f(x^{2}) - f(x^*) \geq \cdots \geq f(x^{k}) - f(x^*).$$

Thus we have

$$\begin{align*}
f(x^{k}) - (x^*) &\leq \frac{1}{k}\sum_{i=1}^{k}\Big[f(x^{(i)}) - f(x^*)\Big]\\
&\leq \frac{1}{k}\frac{1}{2t}\|x^{(0)} - x^*\|_2^2\\
&= \frac{1}{2tk}\|x^{(0)} - x^*\|_2^2. & \mathrm{Q.E.D.}
\end{align*}$$

<d-byline></d-byline>

<p class="citation">
    Credit to Ryan Tibshirani, powered by <a href="https://www.mathjax.org">
    <img title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" style="border:0;" alt="Powered by MathJax" />
    </a>
</p>