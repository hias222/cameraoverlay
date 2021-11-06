
# transform

# Attention

* position image in gimp at left upper corner (start - 0 0 0 )
* choose right resolution

## 3x3 gimp

3x3
  
```matrix
(
0.2581, -0.9540,  658
-0.0842, -0.2114, 310
-0.0004 -0.0009, 1
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
0.2581, -0.0842, 0, -0.0004
-2.9540, -0.2114,0, -0.0009
0,0,1,0
658,310,0,1
)
```

## css output

transform: matrix3d(00.2581, -0.0842, 0, -0.0004, -2.9540, -0.2114,0, -0.0009, 0,0,1,0, 658,310,0,1); 

transform: matrix3d(0.5387, -0.0106, 0, -0.0003, -1.4835, 0.0204,0, -0.0014, 0,0,1,0, 712.4902,144.7778,0,1); 

transform: matrix3d(0.2484, -0.0073, 0, -0.0001, -1.2530, 0.0128,0, -0.0011, 0,0,1,0, 774.7402,131.2497,0,1); 