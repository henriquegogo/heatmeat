# heatmeat
How pure HTML should be

What is it?
-----------

A simple framework that enable HTML FORM to make all REST methods and enable any other elements to act as forms.

Usage
-----

The only requirement to make it work is import the script src and a `target` attribute set to a classname or id.

TIP: Open network inspector and check the requests in real time.

### Form methods

You can use any HTTP method, including `PUT`, `DELETE`, `PATCH` and others instead of only `GET` and `POST`.

```
<script src="heatmeal.js"></script>

<form action="/example" method="DELETE" target=".example">
  <input hidden name="id" value="1">
  <input type="submit" value="DELETE FORM BUTTON">
</form>

<!-- OR -->

<form action="/example" target=".example">
  <input hidden name="\_method" value="DELETE">
  <input hidden name="id" value="1">
  <input type="submit" value="DELETE FORM BUTTON">
</form>

<div class="example"></div>
```

### Link response

You can render a link response into a `div` or any other HTML element. Just set a target attribute that references an classname or id.

```
<a href="/example" target=".example">Example Link</a>

<div class="example"></div>
```

### Using data-\* attributes

You can use dataset attributes to set method, action, target and request attributes instead of create a whole `form`.

```
<button
  data-method="POST"
  data-action="/example"
  data-target=".example"
  data-name="Example"
>POST BUTTON</button>

<div class="example"></div>
```

Lifecycle
---------

You can call javascript functions before and after request execution just using `onchange` and `onload` HTML events. Errors can be handled by `onerror` event.

### Before - onchange

The `onchange` event should be attached to the target element and will be dispatched before `fetch()` function be invoked. This is useful to create "Loading..." feedback messages.

```
<a href="/example" target=".example">Click to load</a>

<div class=".example" onchange="this.innerHTML = 'Loading...'"></div>
```

### After - onload

The `ononload` event should be attached to the target element and will be dispatched after request return and it's content be rendered in target element.

```
<a href="/example.html" target=".example">Click to load</a>

<div class=".example" onload="this.classList.add('red')"></div>
```

### Error - onerror

The `onerror` event should be attached to the target element and will be dispatched if request failed. The first paramenter will be the event object and the error message is event.message.

```
<a href="/example" data-method="POST" target=".example">Click to try to POST</a>

<div class=".example" onerror="this.innerHTML = event.message"></div>
```

### Other events

Any other event will be dispatched as expected while using pure HTML. You can use `onclick` event to rise a confirmation dialog or a validator.

```
<button
  onclick="!confirm('Are you sure?') && event.stopPropagation()"
  data-method="GET"
  data-href="/example.html"
  data-target=".example"
>CONFIRM BUTTON</button>

<div class=".example"></div>
```

Rendering position
------------------

Sometimes you may need to render the content in adjacent postion of target element or in other place. To handle this you can use `.insertAdjacentHTML()` positions adding a data-position attribute.

```
<a href="/example.html" target=".example">Render</a>

<!-- beforebegin -->
<div class="example" data-position="beforebegin">
  <!-- afterbegin -->
  Content
  <!-- beforeend -->
</div>
<!-- afterend -->
```

License
-------

MIT
