# Chrome DevTools CSS investigation report

## 1. Selected Element

For this investigation, I selected the active category filter button:

```html
<button class="filter-btn filter-btn--active">Lunch</button>
```

I chose this element because its final styling is not defined by a single CSS rule. Instead, it results from the interaction of multiple sources:

- the base .filter-btn rule

- the modifier rule .filter-btn--active

- hover logic for non-active buttons

- values defined through CSS custom properties

- SCSS nesting compiled into generated CSS

## 2. Analyze five CSS properties

1. **background-color**

Computed value (DevTools):

#F59E0B

Styles rule:

.filter-btn--active {
background: var(--primary);
}

Generated CSS location:
dist/assets/index-xxxxx.css

Original source:
src/styles/\_filters.scss

The final color comes from the CSS variable --primary.

2. **color**

Computed value:

#FFFFFF

Styles rule:

.filter-btn--active {
color: white;
}

Generated CSS location:
dist/assets/index-xxxxx.css

Original source:
src/styles/\_filters.scss

3. **padding-top**

Computed value:

11.2px

Styles rule:

.filter-btn {
padding: 0.7rem 1rem;
}

Generated CSS location:
dist/assets/index-xxxxx.css

Original source:
src/styles/\_filters.scss

DevTools converts the rem value to pixels in the Computed panel.

4. **border-radius**

Computed value:

999px

Styles rule:

.filter-btn {
border-radius: 999px;
}

Generated CSS location:
dist/assets/index-xxxxx.css

Original source:
src/styles/\_filters.scss

5. **border-color**

Computed value:

#F59E0B

Styles rule:

.filter-btn--active {
border-color: var(--primary);
}

Generated CSS location:
dist/assets/index-xxxxx.css

Original source:
src/styles/\_filters.scss

## 3. Identify and describe three cases where this step-by-step mapping becomes ambiguous, indirect, or breaks down

## Cases Where the Mapping Becomes Ambiguous or Indirect

1. **CSS Variables**

Some properties use CSS variables, such as `var(--primary)`. In DevTools, the Computed panel shows the final resolved value (for example `#F59E0B`), but the original source only contains the variable reference. To understand where the value comes from, it must be traced back to the variable definition in another file (`_variables.scss`). This makes the mapping indirect.

2. **Unit Conversion**

In the source SCSS, padding is defined using `rem` units (`padding: 0.7rem 1rem`). However, in the Computed panel DevTools displays the value in pixels (`11.2px`). Because the browser converts the units during computation, the value shown in DevTools does not exactly match the value written in the source code.

3. **Multiple CSS Rules and Cascade**

The final appearance of the active filter button is not defined by a single rule. The base rule `.filter-btn` defines the general styling, while `.filter-btn--active` overrides specific properties such as background color and border color. Because several rules interact through the CSS cascade, it is not always possible to map the computed style directly to a single declaration.
