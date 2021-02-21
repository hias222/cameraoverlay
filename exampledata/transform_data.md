
# transorm

# Attention

* position image in gimp at left upper corner (start - 0 0 0 )
* choose right resolution

## 3x3 gimp

3x3
  
```matrix
(
0.4678, -2.0758,  639
-0.0930, -0.4543, 316
-0.0004 -0.0020, 1
)
```

## 4x4 css

Change order to top - down

```bash
V V 0 V
V V 0 V
0 0 1 0
V V 0 v
```

```matrix
(
0.4678, -0.093, 0, -0.0004
-2.0758, -0.4543,0, -0.002
0,0,1,0
639,316,0,1
)
```

## css output

transform: matrix3d(0.4678, -0.093, 0, -0.0004, -2.0758, -0.4543,0, -0.002, 0,0,1,0, 639,316,0,1); 