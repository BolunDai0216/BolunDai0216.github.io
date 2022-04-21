--- 
page-type: blog-post 
title: Important Part of Gradient Descent Convergence Proof
description: By Bolun Dai | Feb 10th 2021
class: convex-opt
link: None
text: As topic.
--- 

This blog post proves a crucial statement in the gradient descent convergence analysis: from the assumption $$f$$ is convex, twice differentiable function and $$\nabla{f}$$ is Lipschitz continuous with constant $$L>0$$ we have

$$f(y) \leq f(x) + \nabla{f}(x)^T(y - x) + \frac{L}{2}\|y-x\|_2^2.$$

Here we list four statements:
- (1) $$\nabla{f}$$ is Lipschitz continuous with constant $$L>0$$
- (2) $$(\nabla{f}(x)-\nabla{f}(y))^T(x-y)\leq L\|x-y\|_2^2$$ 
- (3) $$\nabla^2{f}(x)\preceq LI$$ 
- (4) $$f(y) \leq f(x) + \nabla{f}(x)^T(y - x) + \frac{L}{2}\|y-x\|_2^2$$ 

The outline of the proof is $$\mathrm{i}\rightarrow \mathrm{iii} \rightarrow \mathrm{iv}$$ but the proof of $$\mathrm{i}\rightarrow \mathrm{ii}$$ is also given.

## i &rarr; ii

From $$\nabla{f}$$ is Lipschitz continuous with constant $$L>0$$ we know $$\|\nabla{f}(x) - \nabla{f}(y)\|_2\leq L\|x-y\|_2$$. From the Cauchy-Schwartz inequality we have

$$|\langle u, v\rangle| \leq \|u\|_2\|v\|_2.$$

Setting $$u = \nabla{f}(x) - \nabla{f}(y)$$ and $$v = x - y$$ we have

$$\begin{align*}
|(\nabla{f}(x) - \nabla{f}(y))^T(x - y)| &\leq \|\nabla{f}(x) - \nabla{f}(y)\|_2\|x - y\|_2\\
&\leq L\|x-y\|_2\|x - y\|_2 & \mathrm{Lipschitz\ condition}\\
&\leq L\|x-y\|_2^2.
\end{align*}$$

Since we have the absolute value of $$(\nabla{f}(x) - \nabla{f}(y))^T(x - y)$$ less than or equal to
$$L\|x-y\|_2^2$$, we definetely have

$$(\nabla{f}(x)-\nabla{f}(x))^T(x-y)\leq L\|x-y\|_2^2.$$

## i &rarr; iii

From the mean value theorem we can have

$$\frac{\nabla f(x + \Delta{x}) - \nabla f(x)}{\Delta{x}} = \nabla^2f(x + t\Delta{x}),\ t\in[0, 1].$$
If we multiply both sides with $$\Delta{x}$$ and take the norm on both sides gives us

$$\begin{align*}
\|\nabla^2f(x + t\Delta{x})\Delta{x}\| &= \|\nabla f(x + \Delta{x}) - \nabla f(x)\|\\
\|\nabla^2f(x + t\Delta{x})\|\|\Delta{x}\| &\leq L\|\Delta{x}\|\\
\|\nabla^2f(x + t\Delta{x})\| &\leq L\\
\|\nabla^2f(x)\| &\leq L & \mathrm{set}\ t\rightarrow 0\
\end{align*}$$

Since $$f$$ is a convex function, we know its Hessian is positive semidefinite. Thus,
$$\|\nabla^2f(x)\|$$ represents the spectral norm, which is equal to its largest eigenvalue. Thus we
have $$\nabla^2{f}(x)\preceq LI$$. See definition 7 and fact 8 of <a href="/assets/images/convex_opt/NotesMatrices.pdf">this note</a>.

### iii &rarr; iv

From the second-order Taylor series we have

$$f(y) = f(x) + \nabla f(x)^T(y - x) + \frac{1}{2}(y - x)^T\nabla^2{f}(x)(y - x).$$

From $$\nabla^2{f}(x)\preceq LI$$ we have

$$\frac{1}{2}(y - x)^T\nabla^2{f}(x)(y - x) \leq \frac{1}{2}(y - x)^TLI(y - x) = \frac{L}{2}\|y-x\|_2^2.$$

Thus we have

$$f(y) \leq f(x) + \nabla{f}(x)^T(y - x) + \frac{L}{2}\|y-x\|_2^2.$$

## i &rarr; iv

Prof.Joan Bruna's mentioned in his class a way to prove iv from i which I did not think of before, thus I will include it here. If we have $$F(t) = f\big(y + t(x-y)\big)$$, then using the fundamental theorem of calculus

$$F(b) - F(a) = \int_{b}^{a}{f(t)dt},\ \mathrm{if\ }F^\prime(t) = f(t),$$

we can have

$$\begin{align}
F(b) - F(a) &= \int_{b}^{a}{F^\prime(t)dt}\\
&= \int_{b}^{a}{(x-y)\nabla{f}\big(y + t(x-y)\big)dt}.
\end{align}$$

By setting $$a = 1$$ and $$b = 0$$ we have

$$F(b) - F(a) = f(x) - f(y) = \int_{0}^{1}{(x-y)\nabla{f}\big(y + t(x-y)\big)dt},$$

which can be written as

$$f(x) - f(y) = \int_{0}^{1}{\Big\langle\nabla{f}\big(y + t(x-y)\big), (x-y)\Big\rangle dt}.$$

Also we need to note that for a constant $$s$$ or function $$s(x)$$ with no $$t$$ in the input, we have $$F(x) = s(x)t$$ and $$dF(x)/dt = s(x)$$. Thus, using the fundamental theorem of calculus we have

$$s(x) = \int_{0}^{1}s(x)dt = s(x)t\Big|_0^1 = s(x) - 0.$$

Therefore, we have

$$\begin{align}
\Bigg|f(x) - f(y) - \langle\nabla f(y), x-y\rangle\Bigg| &=
\Bigg|\int_{0}^{1}{\Big\langle\nabla{f}\big(y +
t(x-y)\big), x-y\Big\rangle dt} - \int_{0}^{1}{\langle\nabla f(y), x-y\rangle dt}\Bigg|\\
&= \Bigg|\int_{0}^{1}{\Big\langle\Big[\nabla{f}\big(y + t(x-y)\big) - \nabla f(y)\Big],
x-y\Big\rangle dt}\Bigg|\\
&\leq \int_{0}^{1}{\Bigg|\Big\langle\Big[\nabla{f}\big(y + t(x-y)\big) - \nabla f(y)\Big],
x-y\Big\rangle\Bigg|dt}\\
&\leq \int_{0}^{1}{\Big\|\nabla{f}\big(y + t(x-y)\big) - \nabla f(y)\Big\|\Big\|x-y\Big\|dt}\\
&\leq \int_{0}^{1}{L\Big\|t(x-y)\Big\|\Big\|x-y\Big\|dt}\\
&= L\|x-y\|^2\int_{0}^{1}{tdt}\\
&= \frac{L}{2}\|x-y\|^2.
\end{align}$$

Then we finally have

$$f(x) \leq f(y) + \langle\nabla f(y), x-y\rangle + \frac{L}{2}\|x-y\|^2,\ \forall x, y.$$

<d-byline></d-byline>

<p class="citation">
    Credit to Ryan Tibshirani, powered by <a href="https://www.mathjax.org">
    <img title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" style="border:0;" alt="Powered by MathJax" />
    </a>
</p>