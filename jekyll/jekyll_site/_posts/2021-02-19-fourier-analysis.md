--- 
page-type: blog-post 
title: Fourier Analysis
description: By Bolun Dai | Feb 19th 2021
class: control-theory
link: None
text: Notes on Fourier analysis based on a <a href="https://youtube.com/playlist? list=PLMrJAkhIeNNT_Xh3Oy0Y4LTj0Oxo8GqsC" class="card-text">video series</a> from Steve Brunton.
toc:
 - name: Preliminaries
 - name: Fourier Series
 - name: Fourier Transform
 - name: Discrete Fourier Transform
 - name: Applications
 - name: Laplace Transform
--- 

The goal of this blog post is to discuss breifly what is Fourier transform and Fourier series, show the intuition behind them and talk about how to obtain them in real life.

# Preliminaries

What Fourier series and Fourier transform both enable us to do is to represent functions as a sum of cosine and sine functions. We will see that we can treat cosine and sine functions of different frequencies as basis: the Fourier basis, and by projecting the original function onto this Fourier basis we can figure out how large a portion does a specific sine or cosine wave occupy in the original signal. We will see how we can do this on periodic (Fourier series) and non-periodic signals (Fourier transform).

Before going into the details, first let's review inner products and its role in projections, then we will show that using a specific definition of inner products sine and cosine waves form an orthogonal basis. In the Euclidean space, the inner product can be seen as a measurement of how similar two vectors are. The inner product of two vectors in a Euclidean space can be calulated as

$$\langle\vec{a},\vec{b}\rangle = \|\vec{a}\|\|\vec{b}\|\cos\theta,$$
                            
where $$\theta$$ is the angle between $$\vec{a}$$ and $$\vec{b}$$. We can see if the two vectors are pointing in the same direction $$\cos\theta = 1$$, if they are pointing in the opposite direction then $$\cos\theta = -1$$. Thus, the more similar the two vectors, the larger the inner product, vice versa. If $$\vec{b}$$ is a unit vector then $$\|\vec{a}\|\|\vec{b}\|\cos\theta$$ is the magnitude of the projection vector of $$\vec{a}$$ onto $$\vec{b}$$. If we have two coordinate systems $$x, y$$ and $$u, v$$, for a vector in the $$x, y$$ coordinate system it can be represented as

$$\vec{p} = (a, b) := a\frac{\vec{x}}{\|\vec{x}\|^2} + b\frac{\vec{y}}{\|\vec{y}\|^2}.$$

To represent it in the $$u, v$$ coordinate system, we would have

$$\vec{p} = (\langle\vec{p},\vec{u}\rangle, \langle\vec{p},\vec{v}\rangle) := \langle\vec{p},\vec{u}\rangle\frac{\vec{u}}{\|\vec{u}\|^2} + \langle\vec{p},\vec{v}\rangle\frac{\vec{v}}{\|\vec{v}\|^2}.$$

The reason the we have the norm square in the denominator is because the projection vector of $$\vec{a}$$ onto $$\vec{b}$$ is actually $$\|\vec{a}\|\cos\theta\vec{e}$$, where $$\vec{e}$$ is the unit vector along the direction of $$\vec{b}$$. Thus we have

$$\langle\vec{a},\vec{b}\rangle\frac{\vec{b}}{\|\vec{b}\|^2} = \|\vec{a}\|\|\vec{b}\|\cos\theta\frac{\vec{b}}{\|\vec{b}\|^2} = \|\vec{a}\|\cos\theta\frac{\vec{b}}{\|\vec{b}\|} = \|\vec{a}\|\cos\theta\vec{e}$$

The above definition of the inner product is defined in the Euclidean space. Since we are using sine and cosine functions as basis, we are no longer in a Euclidean space, now we are in the realm of a Hilbert space (this is not important, you can just see this as a way of saying the coordinate system is made up of functions). In the Hilbert space, the inner product can be defined as

$$\Big\langle f(x), g(x)\Big\rangle = \int_b^a f(x)\overline{g}(x)dx, x\in\mathbb{C}$$

where $$\overline{g}(x)$$ denotes the conjugate of $$g(x)$$. Recall the conjugate of $$a + ib$$ is simply $$a - ib$$. If we are using a computer to get data from $$f(x)$$ and $$g(x)$$, we are not able to get the data at each $$x$$. What we can do is for every fixed iterval $$\Delta{x}$$ we sample a data point and we can calculate the inner product as

$$\Big\langle f(x), g(x)\Big\rangle \approx \sum_{i=1}^{n}{f_i\overline{g}_i\Delta{x}}.$$

# Fourier Series

First we show the result, for $$f(x)$$ defined on $$[-\pi, \pi]$$ we have:

$$f(x) = \frac{A_0}{2} + \sum_{k=1}^{\infty}\Big[A_k\cos(kx) + B_k\sin(kx)\Big],$$

where we have

$$A_k = \frac{1}{\pi}\int_{-\pi}^{\pi}{f(x)\cos(kx)dx} = \frac{1}{\|\cos(kx)\|^2}\Big\langle f(x), \cos(kx)\Big\rangle$$

and

$$B_k = \frac{1}{\pi}\int_{-\pi}^{\pi}{f(x)\sin(kx)dx} = \frac{1}{\|\sin(kx)\|^2}\Big\langle f(x), \sin(kx)\Big\rangle.$$

We can see that by simply projecting $$f(x)$$ onto the sine and cosine functions we can get the corresponding Fourier coefficients. If $$f(x)$$ is defined on $$[0, L]$$ then we would need to use a different set of sine and cosine functions. This set of functions need to have periods of $$L$$ or $$L/k$$. Note that the period of $$\sin(kx)$$ is $$2\pi/k$$. Thus, if $$\sin(mx)$$ has period $$L/k$$ we have

$$\frac{2\pi}{m} = \frac{L}{k} \rightarrow m = \frac{2k\pi}{L}.$$

Thus, we can write the Fourier series as

$$f(x) = \frac{A_0}{2} + \sum_{k=1}^{\infty}\Big[A_k\cos(\frac{2k\pi}{L}x) + B_k\sin(\frac{2k\pi}{L}x)\Big],$$

with

$$A_k = \frac{2}{L}\int_{0}^{L}{f(x)\cos(\frac{2k\pi}{L}x)dx} = \frac{1}{\|\cos(\frac{2k\pi}{L}x)\|^2}\Big\langle f(x), \cos(\frac{2k\pi}{L}x)\Big\rangle$$

and

$$B_k = \frac{2}{L}\int_{0}^{L}{f(x)\sin(\frac{2k\pi}{L}x)dx} = \frac{1}{\|\sin(\frac{2k\pi}{L}x)\|^2}\Big\langle f(x), \sin(\frac{2k\pi}{L}x)\Big\rangle.$$

Note that even though $$f(x)$$ is defined on $$[0, L]$$, the resulting Fourier series is a periodic function defined on $$\mathbb{R}$$ with period $$L$$.

The above is only concerned about $$f(x)\in\mathbb{R}$$, what happens if $$f(x)\in\mathbb{C}$$? We can use a different set of complex functions $$e^{ikx}$$, which using Euler's equation we have

$$e^{ikx} = \cos(kx) + i\sin(kx).$$

We can easily prove that the $$e^{ikx}$$'s form an orthogonal basis

$$
\begin{align*}
\Big\langle e^{ijx}, e^{ikx}\Big\rangle &= \int_{-\pi}^{\pi}{e^{ijx}(e^{ikx})^*dx}\\
&= \int_{-\pi}^{\pi}{e^{ijx}e^{-ikx}dx}\\
&= \int_{-\pi}^{\pi}{e^{i(j-k)x}dx}\\
&= \frac{1}{i(j-k)}e^{i(j-k)x}\Big|_{-\pi}^{\pi} = \begin{cases}
0 & j\neq k\\ 
2\pi & j = k.
\end{cases}
\end{align*}$$

Then for $$f(x)$$ defined on $$[-\pi, \pi]$$ we have:
$$f(x) = \sum_{k=-\infty}^{\infty}c_ke^{ikx} = \sum_{k=-\infty}^{\infty}(\alpha_k + i\beta_k)\Big[\cos(kx) + i\sin(kx)\Big],$$

where

$$c_k = \frac{1}{2\pi}\Big\langle f(x), e^{ikx}\Big\rangle.$$

# Fourier Transform

Till now, we only dealt with signals that are periodic, for non-periodic signals we will have to use a new tool: Fourier transform. Let's first see what happens if we write out the complex Fourier series for signals $$f(x)$$ that are only defined on $$[-L, L]$$, then we will get a $$f(x)$$ using Fourier series that is $$2L$$ periodic. If $$L\rightarrow\infty$$, then $$f(x)$$ becomes a non-periodic signal, and we will see what happens as it approaches this limit.

As for $$f(x)$$ that are defined on $$[0, L]$$, we need to first see what happens to the sine and cosine functions if they are $$2L$$ or $$2L/k$$ periodic

$$\frac{2\pi}{m} = \frac{2L}{k} \rightarrow m = \frac{k\pi}{L}.$$

Thus we have

$$\cos(\frac{k\pi}{L}x) + i\sin(\frac{k\pi}{L}x) = e^{ik\pi x/L},$$

the corresponding Fourier series becomes

$$f(x) = \sum_{k=-\infty}^{\infty}c_ke^{ik\pi x/L},$$

with

$$c_k = \frac{1}{2\pi}\Big\langle f(x), e^{ik\pi x/L}\Big\rangle = \frac{1}{2L}\int_{-L}^{L}{f(x)e^{-ik\pi x/L}dx}.$$

To simplify the notation we define $$\Delta{\omega} = \pi/L$$, as $$L\rightarrow\infty$$ we
have $$\Delta{\omega}\rightarrow0$$. We then have

$$\begin{align*}
f(x) &= \lim_{L\rightarrow\infty}\sum_{k=-\infty}^{\infty}c_ke^{ik\pi x/L}\\
&=
\lim_{L\rightarrow\infty}\sum_{k=-\infty}^{\infty}\Bigg[\frac{1}{2L}\int_{-L}^{L}{f(x)e^{-ik\pi
x/L}dx}\Bigg]e^{ik\pi x/L}\\
&=
\lim_{L\rightarrow\infty}\sum_{k=-\infty}^{\infty}\Bigg[\frac{1}{2L}\int_{-L}^{L}{f(\xi)e^{-ik\pi
\xi/L}d\xi}\Bigg]e^{ik\pi x/L} & \mathrm{replace}\ x\ \mathrm{using\ a\ dummy\ variable\
}\xi\\
&=
\lim_{\Delta{\omega}\rightarrow0}\sum_{k=-\infty}^{\infty}\Bigg[\frac{\Delta{\omega}}{2\pi}\int_{-\pi/\Delta{\omega}}^{\pi/\Delta{\omega}}{f(\xi)e^{-ik\Delta{\omega}
\xi}d\xi}\Bigg]e^{ik\Delta{\omega}x} & \mathrm{replace}\ L\ \mathrm{with}\ \Delta{\omega}\\
&=
\lim_{\Delta{\omega}\rightarrow0}\sum_{k=-\infty}^{\infty}\Bigg[\frac{1}{2\pi}\int_{-\pi/\Delta{\omega}}^{\pi/\Delta{\omega}}{f(\xi)e^{-ik\Delta{\omega}
\xi}d\xi}\Bigg]e^{ik\Delta{\omega}x}\Delta{\omega}\\
&=
\int_{-\infty}^{\infty}\frac{1}{2\pi}\Bigg[\int_{-\infty}^{\infty}{f(\xi)e^{-i\omega\xi}d\xi}\Bigg]e^{i\omega
x}d\omega\\
&= \frac{1}{2\pi}\int_{-\infty}^{\infty}\widehat{f}(\omega)e^{i\omega x}d\omega.
\end{align*}$$

This gives us a forward and an inverse Fourier transform, or a Fourier transform pair

$$\begin{align*}
\widehat{f}(\omega) &= \mathcal{F}\Big(f(x)\Big) = \int_{-\infty}^{\infty}{f(x)e^{-i\omega
x}dx}\\
f(x) &= \mathcal{F}^{-1}\Big(\widehat{f}(\omega)\Big) =
\frac{1}{2\pi}\int_{-\infty}^{\infty}\widehat{f}(\omega)e^{i\omega x}d\omega.
\end{align*}$$

# Discrete Fourier Transform

One thing to note is that using discrete Fourier transform (DFT) you are actually generating a periodic function, where it is the same on the finite interval where the original function $$f(x)$$ is defined. So a more suitable name maybe discrete Fourier series. Another widely used algorithm is the fast Fourier transform (FFT). The relationship between FFT and DFT is: FFT is a way to numerically realize DFT.

The forward and inverse pair of DFT is

$$\begin{align*}
\hat{f}_k &= \sum_{j=0}^{N-1}{f_je^{-i2\pi jk/n}}\\
f_k &= \frac{1}{n}\sum_{j=0}^{N-1}{\hat{f}_je^{i2\pi jk/n}}.
\end{align*}$$

We can define $$\omega_n = e^{-i2\pi/n}$$, then we can write the relationship between the
discrete sampled data points $$f_k$$'s and the Fourier series coefficient $$\hat{f}_k$$'s

$$\begin{bmatrix}
\hat{f}_0\\
\hat{f}_1\\
\hat{f}_2\\
\vdots\\
\hat{f}_n
\end{bmatrix} = \underbrace{\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & \omega_n & \omega_n^2 & \cdots & \omega_n^{(n-1)}\\
1 & \omega_n^2 & \omega_n^4 & \cdots & \omega_n^{2(n-1)}\\
\vdots\ & \vdots\ & \vdots\ & \ddots & \vdots\\\
1 & \omega_n^{(n-1)} & \omega_n^{2(n-1)} & \cdots & \omega_n^{(n-1)^2}\\
\end{bmatrix}}_\mathrm{DFT\ Matrix}\begin{bmatrix}
f_0\\
f_1\\
f_2\\
\vdots\\
f_n
\end{bmatrix}$$

# Applications

This section we will talk about how we can apply Fourier transform to solve a variety of problems. These include a way to calculate derivative that has higher accuracy than simply doing finite differencing, transforming a convolution into multiplication in the frequency domain.

We will show how taking the Fourier transform of derivatives gives a nice way to calculate derivatives
$$\begin{align*}
\mathcal{F}\Big(\frac{d}{dt}f(x)\Big) &=
\int_{-\infty}^{\infty}{\frac{d}{dt}f(x)e^{-i\omega x}dx}\\
&= \int_{-\infty}^{\infty}{\frac{d}{dt}f(x)e^{-iwx}dx} &
\text{perform integration by parts}\ \int{duv} = uv - \int{udv}\\
&= f(x)e^{-i\omega x}\Big|_{-\infty}^{\infty} +
i\omega\int_{-\infty}^{\infty}{f(x)e^{-i\omega x}dx}\\
&= 0 + i\omega\int_{-\infty}^{\infty}{f(x)e^{-i\omega x}dx} & \text{as}\
x\rightarrow\pm\infty,\ f(x)\rightarrow0\\
&= i\omega\widehat{f}(\omega) = i\omega\mathcal{F}\Big(f(x)\Big)
\end{align*}$$

Now let's look into the relationship between convolutions and multiplication in the Fourier domain. A convolution is defined as

$$f(x)*g(x). = \int_{-\infty}^{\infty}{f(x-\xi)g(\xi)d\xi}.$$

If we take the inverse Fourier transform of the multiplication of $$\widehat{f}(\omega)$$ and $$\widehat{g}(\omega)$$ we have

$$\begin{align*}
\mathcal{F}^{-1}\Big(\widehat{f}(\omega)\widehat{g}(\omega)\Big) &=
\frac{1}{2\pi}\int_{-\infty}^{\infty}{\widehat{f}(\omega)\widehat{g}(\omega)e^{i\omega
x}d\omega}\\
&=
\frac{1}{2\pi}\int_{-\infty}^{\infty}{\widehat{f}(\omega)\Big[\int_{-\infty}^{\infty}{g(y)e^{-i\omega
y}dy}\Big]e^{i\omega
x}d\omega}\\
&=
\frac{1}{2\pi}\int_{-\infty}^{\infty}{\int_{-\infty}^{\infty}{\widehat{f}(\omega)g(y)e^{-i\omega
y}e^{i\omega x}dy}d\omega}\\
&=
\frac{1}{2\pi}\int_{-\infty}^{\infty}{\int_{-\infty}^{\infty}{\widehat{f}(\omega)g(y)e^{i\omega
(x-y)}d\omega}dy} & \text{commutative property of double integrals}\\
&=
\frac{1}{2\pi}\int_{-\infty}^{\infty}{g(y)\int_{-\infty}^{\infty}{\widehat{f}(\omega)e^{i\omega
(x-y)}d\omega}dy}\\
&= \int_{-\infty}^{\infty}{g(y)f(x - y)dy} & f(x - y) =
\mathcal{F}^{-1}(\widehat{f}(\omega)) =
\frac{1}{2\pi}\int_{-\infty}^{\infty}\widehat{f}(\omega)e^{i\omega(x-y)}d\omega\\
&= f(x)*g(x).
\end{align*}$$

Thus we have

$$\mathcal{F}(f(x)*g(x)) = \mathcal{F}(f(x)\mathcal{F}(g(x)) = \widehat{f}(\omega)\widehat{g}(\omega).$$

# Laplace Transform

One limitation for Fourier transform is that it is only able to deal with functions that decay to zero as it approaches both positive and negative infinity. To deal with functions that does not decay to zero you would need to utilize the Laplace transform. Essentially, the Laplace transform constructs a new well-behaved function $$F(x)$$ from the original function $$f(x)$$,

$$F(x) = f(x)e^{-\gamma x}H(x) = \begin{cases}
f(x)e^{-\gamma x} & x\geq0\\
0 & x\leq0
\end{cases},$$

with $$H(x)$$ being the heaviside function

$$H(x) = \begin{cases}
1 & x\geq0\\
0 & x\leq0
\end{cases}.$$

We can see that $$F(x)$$ now is a well-behaved function that decays to zero as $$x$$ approaches both positive and negative infinity. Then we can simply perform the Fourier transform on $$F(x)$$

$$\begin{align*}
\hat{F}(x) &= \int_{-\infty}^{\infty}{F(x)e^{-i\omega x}dx}\\
&= \int_{-\infty}^{\infty}{f(x)e^{-\gamma x}H(x)e^{-i\omega x}dx} & F(x) = f(x)e^{-\gamma
x}H(x)\\
&= \int_{0}^{\infty}{f(x)e^{-\gamma x}e^{-i\omega x}dx} & H(x) = 0\ \mathrm{for}\ x \leq 0\\
&= \int_{0}^{\infty}{f(x)e^{-(\gamma + i\omega) x}dx}\\
&= \int_{0}^{\infty}{f(x)e^{-sx}dx} & s = \gamma + i\omega\\
&= \bar{f}(s),
\end{align*}$$

this is the forward Laplace transform. For the inverse Laplace transform, we can simply perform the inverse Fourier transform on $$\hat{F}(x)$$

$$\begin{align*}
f(x) &= e^{\gamma x}F(x) \\
&= e^{\gamma x}\frac{1}{2\pi}\int_{-\infty}^{\infty}{\hat{F}(x)e^{i\omega
x}d\omega}\\
&= \frac{1}{2\pi}\int_{-\infty}^{\infty}{\bar{f}(s)e^{\gamma + i\omega x}d\omega}\\
&= \frac{1}{2\pi}\int_{-\infty}^{\infty}{\bar{f}(s)e^{sx}d\omega}\\
&= \frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty}{\bar{f}(s)e^{sx}ds} & ds =
id\omega.
\end{align*}$$

And we have the Laplace transform pair

$$\begin{align*}
\bar{f}(s) &= \int_{0}^{\infty}{f(x)e^{-sx}dx}\\
f(x) &= \frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty}{\bar{f}(s)e^{sx}ds}.
\end{align*}$$

Note that the recovered $$f(x)$$ only consists of the positive $$x$$ portion, however, for most control related cases that would be enough due to nothing happening when time is negative.

Some properties of the Laplace transform:

$$\begin{align}
\mathcal{L}\{f(x)\} &= \bar{f}(s)\\
\mathcal{L}\Big\{\frac{df}{dx}\Big\} &= -f(0) + s\bar{f}(s)\\
\mathcal{L}\Big\{f(x)*g(x)\Big\} &= \mathcal{L}\{f(x)\}\mathcal{L}\{g(x)\} =
\bar{f}(s)\bar{g}(s).
\end{align}$$

<d-byline></d-byline>

<p class="citation">
    Credit to Steve Brunton, powered by <a href="https://www.mathjax.org">
    <img title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" style="border:0;" alt="Powered by MathJax" />
    </a>
</p>