// 美制螺纹查询逻辑实现
// 依据ANSI/ASME B1.1标准
Page({
  data: {
    specificationList: ['#0-80', '#1-64', '#2-56', '#3-48', '#4-40', '#5-40', '#6-32', '#8-32', '#10-24', '#10-32', '1/4-20', '1/4-28', '5/16-18', '5/16-24', '3/8-16', '3/8-24', '7/16-14', '7/16-20', '1/2-13', '1/2-20', '9/16-12', '9/16-18', '5/8-11', '5/8-18', '3/4-10', '3/4-16', '7/8-9', '7/8-14', '1-8', '1-12', '1 1/8-7', '1 1/8-12', '1 1/4-7', '1 1/4-12'],
    toleranceList: ['2A', '3A', '2B', '3B'],
    specificationIndex: 0,
    toleranceIndex: 0,
    threadData: null,
    threadDataMap: {
      // 美制统一螺纹数据结构
      '#0-80': { 
        major: 0.060, 
        pitch: 0.0125, 
        series: 'UNF',
        internal: { 
          '2B': { major: { min: 0.0615, max: 0.0645 }, pitch: { min: 0.0519, max: 0.0544 }, minor: { min: 0.0438, max: 0.0475 } },
          '3B': { major: { min: 0.0615, max: 0.0635 }, pitch: { min: 0.0527, max: 0.0540 }, minor: { min: 0.0450, max: 0.0467 } } 
        },
        external: { 
          '2A': { major: { max: 0.0580, min: 0.0568 }, pitch: { max: 0.0508, min: 0.0496 }, minor: { max: 0.0432, min: 0.0411 } },
          '3A': { major: { max: 0.0580, min: 0.0572 }, pitch: { max: 0.0516, min: 0.0508 }, minor: { max: 0.0442, min: 0.0430 } } 
        } 
      },
      '#1-64': { major: 0.073, pitch: 0.0156, series: 'UNF',
        internal: { '2B': { major: { min: 0.0744, max: 0.0774 }, pitch: { min: 0.0641, max: 0.0666 }, minor: { min: 0.0552, max: 0.0589 } },
                    '3B': { major: { min: 0.0744, max: 0.0764 }, pitch: { min: 0.0649, max: 0.0662 }, minor: { min: 0.0564, max: 0.0581 } } },
        external: { '2A': { major: { max: 0.0708, min: 0.0695 }, pitch: { max: 0.0630, min: 0.0618 }, minor: { max: 0.0546, min: 0.0524 } },
                    '3A': { major: { max: 0.0708, min: 0.0699 }, pitch: { max: 0.0638, min: 0.0630 }, minor: { max: 0.0556, min: 0.0544 } } } },
      '#2-56': { major: 0.086, pitch: 0.0179, series: 'UNF',
        internal: { '2B': { major: { min: 0.0874, max: 0.0906 }, pitch: { min: 0.0765, max: 0.0791 }, minor: { min: 0.0669, max: 0.0707 } },
                    '3B': { major: { min: 0.0874, max: 0.0894 }, pitch: { min: 0.0773, max: 0.0786 }, minor: { min: 0.0681, max: 0.0699 } } },
        external: { '2A': { major: { max: 0.0838, min: 0.0824 }, pitch: { max: 0.0754, min: 0.0741 }, minor: { max: 0.0663, min: 0.0639 } },
                    '3A': { major: { max: 0.0838, min: 0.0828 }, pitch: { max: 0.0762, min: 0.0754 }, minor: { max: 0.0673, min: 0.0660 } } } },
      '#3-48': { major: 0.099, pitch: 0.0208, series: 'UNF',
        internal: { '2B': { major: { min: 0.1005, max: 0.1037 }, pitch: { min: 0.0889, max: 0.0916 }, minor: { min: 0.0785, max: 0.0825 } },
                    '3B': { major: { min: 0.1005, max: 0.1025 }, pitch: { min: 0.0897, max: 0.0910 }, minor: { min: 0.0798, max: 0.0816 } } },
        external: { '2A': { major: { max: 0.0968, min: 0.0953 }, pitch: { max: 0.0878, min: 0.0864 }, minor: { max: 0.0779, min: 0.0753 } },
                    '3A': { major: { max: 0.0968, min: 0.0958 }, pitch: { max: 0.0886, min: 0.0878 }, minor: { max: 0.0789, min: 0.0776 } } } },
      '#4-40': { major: 0.112, pitch: 0.0250, series: 'UNF',
        internal: { '2B': { major: { min: 0.1135, max: 0.1169 }, pitch: { min: 0.1007, max: 0.1036 }, minor: { min: 0.0894, max: 0.0936 } },
                    '3B': { major: { min: 0.1135, max: 0.1155 }, pitch: { min: 0.1016, max: 0.1030 }, minor: { min: 0.0908, max: 0.0927 } } },
        external: { '2A': { major: { max: 0.1098, min: 0.1082 }, pitch: { max: 0.0995, min: 0.0980 }, minor: { max: 0.0887, min: 0.0858 } },
                    '3A': { major: { max: 0.1098, min: 0.1087 }, pitch: { max: 0.1004, min: 0.0996 }, minor: { max: 0.0898, min: 0.0884 } } } },
      '#5-40': { major: 0.125, pitch: 0.0250, series: 'UNF',
        internal: { '2B': { major: { min: 0.1264, max: 0.1299 }, pitch: { min: 0.1127, max: 0.1157 }, minor: { min: 0.1004, max: 0.1047 } },
                    '3B': { major: { min: 0.1264, max: 0.1284 }, pitch: { min: 0.1137, max: 0.1151 }, minor: { min: 0.1019, max: 0.1039 } } },
        external: { '2A': { major: { max: 0.1219, min: 0.1202 }, pitch: { max: 0.1114, min: 0.1098 }, minor: { max: 0.0996, min: 0.0965 } },
                    '3A': { major: { max: 0.1219, min: 0.1208 }, pitch: { max: 0.1124, min: 0.1114 }, minor: { max: 0.1009, min: 0.0994 } } } },
      '#6-32': { major: 0.138, pitch: 0.0312, series: 'UNC',
        internal: { '2B': { major: { min: 0.1394, max: 0.1431 }, pitch: { min: 0.1230, max: 0.1260 }, minor: { min: 0.1085, max: 0.1133 } },
                    '3B': { major: { min: 0.1394, max: 0.1414 }, pitch: { min: 0.1240, max: 0.1254 }, minor: { min: 0.1101, max: 0.1122 } } },
        external: { '2A': { major: { max: 0.1349, min: 0.1330 }, pitch: { max: 0.1217, min: 0.1199 }, minor: { max: 0.1076, min: 0.1040 } },
                    '3A': { major: { max: 0.1349, min: 0.1337 }, pitch: { max: 0.1228, min: 0.1217 }, minor: { max: 0.1093, min: 0.1076 } } } },
      '#8-32': { major: 0.164, pitch: 0.0312, series: 'UNC',
        internal: { '2B': { major: { min: 0.1654, max: 0.1693 }, pitch: { min: 0.1480, max: 0.1510 }, minor: { min: 0.1325, max: 0.1376 } },
                    '3B': { major: { min: 0.1654, max: 0.1674 }, pitch: { min: 0.1490, max: 0.1504 }, minor: { min: 0.1342, max: 0.1364 } } },
        external: { '2A': { major: { max: 0.1609, min: 0.1588 }, pitch: { max: 0.1467, min: 0.1448 }, minor: { max: 0.1316, min: 0.1276 } },
                    '3A': { major: { max: 0.1609, min: 0.1596 }, pitch: { max: 0.1478, min: 0.1467 }, minor: { max: 0.1333, min: 0.1316 } } } },
      '#10-24': { major: 0.190, pitch: 0.0417, series: 'UNC',
        internal: { '2B': { major: { min: 0.1914, max: 0.1959 }, pitch: { min: 0.1697, max: 0.1732 }, minor: { min: 0.1508, max: 0.1567 } },
                    '3B': { major: { min: 0.1914, max: 0.1939 }, pitch: { min: 0.1709, max: 0.1726 }, minor: { min: 0.1527, max: 0.1552 } } },
        external: { '2A': { major: { max: 0.1864, min: 0.1838 }, pitch: { max: 0.1681, min: 0.1654 }, minor: { max: 0.1496, min: 0.1443 } },
                    '3A': { major: { max: 0.1864, min: 0.1847 }, pitch: { max: 0.1695, min: 0.1681 }, minor: { max: 0.1517, min: 0.1496 } } } },
      '#10-32': { major: 0.190, pitch: 0.0312, series: 'UNF',
        internal: { '2B': { major: { min: 0.1914, max: 0.1953 }, pitch: { min: 0.1740, max: 0.1770 }, minor: { min: 0.1585, max: 0.1636 } },
                    '3B': { major: { min: 0.1914, max: 0.1934 }, pitch: { min: 0.1750, max: 0.1764 }, minor: { min: 0.1602, max: 0.1624 } } },
        external: { '2A': { major: { max: 0.1864, min: 0.1843 }, pitch: { max: 0.1727, min: 0.1708 }, minor: { max: 0.1576, min: 0.1536 } },
                    '3A': { major: { max: 0.1864, min: 0.1851 }, pitch: { max: 0.1738, min: 0.1727 }, minor: { max: 0.1593, min: 0.1576 } } } },
      '1/4-20': { major: 0.250, pitch: 0.0500, series: 'UNC',
        internal: { '2B': { major: { min: 0.2520, max: 0.2574 }, pitch: { min: 0.2175, max: 0.2210 }, minor: { min: 0.1888, max: 0.1959 } },
                    '3B': { major: { min: 0.2520, max: 0.2550 }, pitch: { min: 0.2186, max: 0.2201 }, minor: { min: 0.1907, max: 0.1938 } } },
        external: { '2A': { major: { max: 0.2469, min: 0.2435 }, pitch: { max: 0.2160, min: 0.2131 }, minor: { max: 0.1874, min: 0.1822 } },
                    '3A': { major: { max: 0.2469, min: 0.2449 }, pitch: { max: 0.2172, min: 0.2157 }, minor: { max: 0.1894, min: 0.1868 } } } },
      '1/4-28': { major: 0.250, pitch: 0.0357, series: 'UNF',
        internal: { '2B': { major: { min: 0.2520, max: 0.2564 }, pitch: { min: 0.2268, max: 0.2296 }, minor: { min: 0.2069, max: 0.2124 } },
                    '3B': { major: { min: 0.2520, max: 0.2544 }, pitch: { min: 0.2277, max: 0.2289 }, minor: { min: 0.2085, max: 0.2109 } } },
        external: { '2A': { major: { max: 0.2469, min: 0.2441 }, pitch: { max: 0.2253, min: 0.2230 }, minor: { max: 0.2055, min: 0.2014 } },
                    '3A': { major: { max: 0.2469, min: 0.2454 }, pitch: { max: 0.2263, min: 0.2253 }, minor: { max: 0.2072, min: 0.2053 } } } },
      '3/8-16': { major: 0.375, pitch: 0.0625, series: 'UNC',
        internal: { '2B': { major: { min: 0.3770, max: 0.3837 }, pitch: { min: 0.3344, max: 0.3384 }, minor: { min: 0.2983, max: 0.3067 } },
                    '3B': { major: { min: 0.3770, max: 0.3805 }, pitch: { min: 0.3357, max: 0.3375 }, minor: { min: 0.3009, max: 0.3044 } } },
        external: { '2A': { major: { max: 0.3711, min: 0.3669 }, pitch: { max: 0.3327, min: 0.3292 }, minor: { max: 0.2967, min: 0.2900 } },
                    '3A': { major: { max: 0.3711, min: 0.3686 }, pitch: { max: 0.3342, min: 0.3327 }, minor: { max: 0.2994, min: 0.2964 } } } },
      '3/8-24': { major: 0.375, pitch: 0.0417, series: 'UNF',
        internal: { '2B': { major: { min: 0.3770, max: 0.3819 }, pitch: { min: 0.3447, max: 0.3478 }, minor: { min: 0.3209, max: 0.3274 } },
                    '3B': { major: { min: 0.3770, max: 0.3795 }, pitch: { min: 0.3457, max: 0.3470 }, minor: { min: 0.3229, max: 0.3256 } } },
        external: { '2A': { major: { max: 0.3711, min: 0.3679 }, pitch: { max: 0.3430, min: 0.3403 }, minor: { max: 0.3192, min: 0.3142 } },
                    '3A': { major: { max: 0.3711, min: 0.3691 }, pitch: { max: 0.3441, min: 0.3430 }, minor: { max: 0.3212, min: 0.3189 } } } },
      '1/2-13': { major: 0.500, pitch: 0.0769, series: 'UNC',
        internal: { '2B': { major: { min: 0.5020, max: 0.5098 }, pitch: { min: 0.4500, max: 0.4545 }, minor: { min: 0.4056, max: 0.4157 } },
                    '3B': { major: { min: 0.5020, max: 0.5060 }, pitch: { min: 0.4516, max: 0.4536 }, minor: { min: 0.4087, max: 0.4127 } } },
        external: { '2A': { major: { max: 0.4959, min: 0.4907 }, pitch: { max: 0.4481, min: 0.4437 }, minor: { max: 0.4037, min: 0.3955 } },
                    '3A': { major: { max: 0.4959, min: 0.4929 }, pitch: { max: 0.4499, min: 0.4481 }, minor: { max: 0.4069, min: 0.4034 } } } },
      '1/2-20': { major: 0.500, pitch: 0.0500, series: 'UNF',
        internal: { '2B': { major: { min: 0.5020, max: 0.5074 }, pitch: { min: 0.4675, max: 0.4710 }, minor: { min: 0.4388, max: 0.4459 } },
                    '3B': { major: { min: 0.5020, max: 0.5050 }, pitch: { min: 0.4686, max: 0.4701 }, minor: { min: 0.4407, max: 0.4438 } } },
        external: { '2A': { major: { max: 0.4969, min: 0.4935 }, pitch: { max: 0.4660, min: 0.4631 }, minor: { max: 0.4374, min: 0.4322 } },
                    '3A': { major: { max: 0.4969, min: 0.4949 }, pitch: { max: 0.4672, min: 0.4657 }, minor: { max: 0.4394, min: 0.4368 } } } },
      '5/16-18': { major: 0.3125, pitch: 0.0556, series: 'UNC',
        internal: { '2B': { major: { min: 0.3145, max: 0.3204 }, pitch: { min: 0.2764, max: 0.2802 }, minor: { min: 0.2433, max: 0.2504 } },
                    '3B': { major: { min: 0.3145, max: 0.3175 }, pitch: { min: 0.2778, max: 0.2795 }, minor: { min: 0.2456, max: 0.2487 } } },
        external: { '2A': { major: { max: 0.3083, min: 0.3044 }, pitch: { max: 0.2746, min: 0.2709 }, minor: { max: 0.2413, min: 0.2350 } },
                    '3A': { major: { max: 0.3083, min: 0.3061 }, pitch: { max: 0.2761, min: 0.2746 }, minor: { max: 0.2437, min: 0.2406 } } } },
      '5/16-24': { major: 0.3125, pitch: 0.0417, series: 'UNF',
        internal: { '2B': { major: { min: 0.3145, max: 0.3194 }, pitch: { min: 0.2872, max: 0.2903 }, minor: { min: 0.2659, max: 0.2724 } },
                    '3B': { major: { min: 0.3145, max: 0.3170 }, pitch: { min: 0.2882, max: 0.2895 }, minor: { min: 0.2679, max: 0.2706 } } },
        external: { '2A': { major: { max: 0.3083, min: 0.3054 }, pitch: { max: 0.2855, min: 0.2828 }, minor: { max: 0.2642, min: 0.2592 } },
                    '3A': { major: { max: 0.3083, min: 0.3066 }, pitch: { max: 0.2866, min: 0.2855 }, minor: { max: 0.2662, min: 0.2639 } } } },
      '7/16-14': { major: 0.4375, pitch: 0.0714, series: 'UNC',
        internal: { '2B': { major: { min: 0.4395, max: 0.4462 }, pitch: { min: 0.4001, max: 0.4041 }, minor: { min: 0.3678, max: 0.3762 } },
                    '3B': { major: { min: 0.4395, max: 0.4430 }, pitch: { min: 0.4014, max: 0.4032 }, minor: { min: 0.3704, max: 0.3739 } } },
        external: { '2A': { major: { max: 0.4334, min: 0.4288 }, pitch: { max: 0.3984, min: 0.3944 }, minor: { max: 0.3661, min: 0.3584 } },
                    '3A': { major: { max: 0.4334, min: 0.4304 }, pitch: { max: 0.3999, min: 0.3984 }, minor: { max: 0.3688, min: 0.3658 } } } },
      '7/16-20': { major: 0.4375, pitch: 0.0500, series: 'UNF',
        internal: { '2B': { major: { min: 0.4395, max: 0.4449 }, pitch: { min: 0.4125, max: 0.4160 }, minor: { min: 0.3908, max: 0.3979 } },
                    '3B': { major: { min: 0.4395, max: 0.4425 }, pitch: { min: 0.4136, max: 0.4151 }, minor: { min: 0.3927, max: 0.3958 } } },
        external: { '2A': { major: { max: 0.4334, min: 0.4300 }, pitch: { max: 0.4110, min: 0.4081 }, minor: { max: 0.3894, min: 0.3842 } },
                    '3A': { major: { max: 0.4334, min: 0.4314 }, pitch: { max: 0.4122, min: 0.4110 }, minor: { max: 0.3914, min: 0.3888 } } } },
      '9/16-12': { major: 0.5625, pitch: 0.0833, series: 'UNC',
        internal: { '2B': { major: { min: 0.5645, max: 0.5722 }, pitch: { min: 0.5232, max: 0.5278 }, minor: { min: 0.4855, max: 0.4954 } },
                    '3B': { major: { min: 0.5645, max: 0.5687 }, pitch: { min: 0.5249, max: 0.5268 }, minor: { min: 0.4889, max: 0.4931 } } },
        external: { '2A': { major: { max: 0.5583, min: 0.5525 }, pitch: { max: 0.5210, min: 0.5158 }, minor: { max: 0.4829, min: 0.4730 } },
                    '3A': { major: { max: 0.5583, min: 0.5545 }, pitch: { max: 0.5230, min: 0.5210 }, minor: { max: 0.4864, min: 0.4822 } } } },
      '9/16-18': { major: 0.5625, pitch: 0.0556, series: 'UNF',
        internal: { '2B': { major: { min: 0.5645, max: 0.5707 }, pitch: { min: 0.5277, max: 0.5315 }, minor: { min: 0.4963, max: 0.5044 } },
                    '3B': { major: { min: 0.5645, max: 0.5680 }, pitch: { min: 0.5290, max: 0.5307 }, minor: { min: 0.4988, max: 0.5023 } } },
        external: { '2A': { major: { max: 0.5583, min: 0.5543 }, pitch: { max: 0.5260, min: 0.5225 }, minor: { max: 0.4945, min: 0.4880 } },
                    '3A': { major: { max: 0.5583, min: 0.5558 }, pitch: { max: 0.5274, min: 0.5260 }, minor: { max: 0.4971, min: 0.4939 } } } },
      '1 1/8-7': { major: 1.125, pitch: 0.1429, series: 'UNC',
        internal: { '2B': { major: { min: 1.1270, max: 1.1384 }, pitch: { min: 1.0322, max: 1.0390 }, minor: { min: 0.9307, max: 0.9485 } },
                    '3B': { major: { min: 1.1270, max: 1.1340 }, pitch: { min: 1.0354, max: 1.0382 }, minor: { min: 0.9362, max: 0.9427 } } },
        external: { '2A': { major: { max: 1.1153, min: 1.1033 }, pitch: { max: 1.0285, min: 1.0188 }, minor: { max: 0.9267, min: 0.9080 } },
                    '3A': { major: { max: 1.1153, min: 1.1083 }, pitch: { max: 1.0319, min: 1.0285 }, minor: { max: 0.9325, min: 0.9260 } } } },
      '1 1/8-12': { major: 1.125, pitch: 0.0833, series: 'UNF',
        internal: { '2B': { major: { min: 1.1270, max: 1.1347 }, pitch: { min: 1.0862, max: 1.0908 }, minor: { min: 1.0485, max: 1.0584 } },
                    '3B': { major: { min: 1.1270, max: 1.1312 }, pitch: { min: 1.0879, max: 1.0898 }, minor: { min: 1.0519, max: 1.0561 } } },
        external: { '2A': { major: { max: 1.1178, min: 1.1120 }, pitch: { max: 1.0840, min: 1.0788 }, minor: { max: 1.0459, min: 1.0360 } },
                    '3A': { major: { max: 1.1178, min: 1.1140 }, pitch: { max: 1.0860, min: 1.0840 }, minor: { max: 1.0494, min: 1.0452 } } }},
      '5/8-11': { major: 0.625, pitch: 0.0909, series: 'UNC',
        internal: { '2B': { major: { min: 0.6270, max: 0.6355 }, pitch: { min: 0.5660, max: 0.5711 }, minor: { min: 0.5104, max: 0.5224 } },
                    '3B': { major: { min: 0.6270, max: 0.6315 }, pitch: { min: 0.5679, max: 0.5700 }, minor: { min: 0.5141, max: 0.5186 } } },
        external: { '2A': { major: { max: 0.6195, min: 0.6131 }, pitch: { max: 0.5637, min: 0.5583 }, minor: { max: 0.5080, min: 0.4975 } },
                    '3A': { major: { max: 0.6195, min: 0.6155 }, pitch: { max: 0.5659, min: 0.5637 }, minor: { max: 0.5119, min: 0.5076 } } } },
      '5/8-18': { major: 0.625, pitch: 0.0556, series: 'UNF',
        internal: { '2B': { major: { min: 0.6270, max: 0.6332 }, pitch: { min: 0.5902, max: 0.5940 }, minor: { min: 0.5588, max: 0.5669 } },
                    '3B': { major: { min: 0.6270, max: 0.6305 }, pitch: { min: 0.5915, max: 0.5932 }, minor: { min: 0.5613, max: 0.5648 } } },
        external: { '2A': { major: { max: 0.6195, min: 0.6155 }, pitch: { max: 0.5885, min: 0.5850 }, minor: { max: 0.5570, min: 0.5505 } },
                    '3A': { major: { max: 0.6195, min: 0.6170 }, pitch: { max: 0.5899, min: 0.5885 }, minor: { max: 0.5596, min: 0.5564 } } } },
      '3/4-10': { major: 0.750, pitch: 0.1000, series: 'UNC',
        internal: { '2B': { major: { min: 0.7520, max: 0.7611 }, pitch: { min: 0.6850, max: 0.6904 }, minor: { min: 0.6226, max: 0.6357 } },
                    '3B': { major: { min: 0.7520, max: 0.7570 }, pitch: { min: 0.6872, max: 0.6894 }, minor: { min: 0.6269, max: 0.6317 } } },
        external: { '2A': { major: { max: 0.7445, min: 0.7369 }, pitch: { max: 0.6824, min: 0.6763 }, minor: { max: 0.6199, min: 0.6078 } },
                    '3A': { major: { max: 0.7445, min: 0.7395 }, pitch: { max: 0.6848, min: 0.6824 }, minor: { max: 0.6244, min: 0.6196 } } } },
      '3/4-16': { major: 0.750, pitch: 0.0625, series: 'UNF',
        internal: { '2B': { major: { min: 0.7520, max: 0.7587 }, pitch: { min: 0.7144, max: 0.7184 }, minor: { min: 0.6833, max: 0.6917 } },
                    '3B': { major: { min: 0.7520, max: 0.7555 }, pitch: { min: 0.7157, max: 0.7175 }, minor: { min: 0.6859, max: 0.6894 } } },
        external: { '2A': { major: { max: 0.7445, min: 0.7399 }, pitch: { max: 0.7127, min: 0.7087 }, minor: { max: 0.6817, min: 0.6740 } },
                    '3A': { major: { max: 0.7445, min: 0.7415 }, pitch: { max: 0.7142, min: 0.7127 }, minor: { max: 0.6844, min: 0.6814 } } } },
      '7/8-9': { major: 0.875, pitch: 0.1111, series: 'UNC',
        internal: { '2B': { major: { min: 0.8770, max: 0.8868 }, pitch: { min: 0.8028, max: 0.8086 }, minor: { min: 0.7338, max: 0.7480 } },
                    '3B': { major: { min: 0.8770, max: 0.8825 }, pitch: { min: 0.8053, max: 0.8077 }, minor: { min: 0.7387, max: 0.7439 } } },
        external: { '2A': { major: { max: 0.8687, min: 0.8599 }, pitch: { max: 0.7999, min: 0.7928 }, minor: { max: 0.7308, min: 0.7167 } },
                    '3A': { major: { max: 0.8687, min: 0.8632 }, pitch: { max: 0.8026, min: 0.7999 }, minor: { max: 0.7359, min: 0.7307 } } } },
      '7/8-14': { major: 0.875, pitch: 0.0714, series: 'UNF',
        internal: { '2B': { major: { min: 0.8770, max: 0.8842 }, pitch: { min: 0.8371, max: 0.8414 }, minor: { min: 0.8028, max: 0.8119 } },
                    '3B': { major: { min: 0.8770, max: 0.8807 }, pitch: { min: 0.8386, max: 0.8404 }, minor: { min: 0.8058, max: 0.8097 } } },
        external: { '2A': { major: { max: 0.8687, min: 0.8634 }, pitch: { max: 0.8351, min: 0.8306 }, minor: { max: 0.8005, min: 0.7922 } },
                    '3A': { major: { max: 0.8687, min: 0.8652 }, pitch: { max: 0.8368, min: 0.8351 }, minor: { max: 0.8036, min: 0.8000 } } } },
      '1-8': { major: 1.000, pitch: 0.1250, series: 'UNC',
        internal: { '2B': { major: { min: 1.0020, max: 1.0124 }, pitch: { min: 0.9188, max: 0.9250 }, minor: { min: 0.8406, max: 0.8560 } },
                    '3B': { major: { min: 1.0020, max: 1.0080 }, pitch: { min: 0.9216, max: 0.9241 }, minor: { min: 0.8461, max: 0.8517 } } },
        external: { '2A': { major: { max: 0.9928, min: 0.9828 }, pitch: { max: 0.9154, min: 0.9074 }, minor: { max: 0.8371, min: 0.8211 } },
                    '3A': { major: { max: 0.9928, min: 0.9872 }, pitch: { max: 0.9185, min: 0.9154 }, minor: { max: 0.8429, min: 0.8371 } } } },
      '1-12': { major: 1.000, pitch: 0.0833, series: 'UNF',
        internal: { '2B': { major: { min: 1.0020, max: 1.0097 }, pitch: { min: 0.9612, max: 0.9658 }, minor: { min: 0.9235, max: 0.9334 } },
                    '3B': { major: { min: 1.0020, max: 1.0062 }, pitch: { min: 0.9629, max: 0.9648 }, minor: { min: 0.9269, max: 0.9311 } } },
        external: { '2A': { major: { max: 0.9928, min: 0.9870 }, pitch: { max: 0.9590, min: 0.9538 }, minor: { max: 0.9209, min: 0.9110 } },
                    '3A': { major: { max: 0.9928, min: 0.9890 }, pitch: { max: 0.9610, min: 0.9590 }, minor: { max: 0.9244, min: 0.9202 } } } },
      '1 1/4-7': { major: 1.250, pitch: 0.1429, series: 'UNC',
        internal: { '2B': { major: { min: 1.2520, max: 1.2634 }, pitch: { min: 1.1572, max: 1.1640 }, minor: { min: 1.0557, max: 1.0735 } },
                    '3B': { major: { min: 1.2520, max: 1.2590 }, pitch: { min: 1.1604, max: 1.1632 }, minor: { min: 1.0612, max: 1.0677 } } },
        external: { '2A': { major: { max: 1.2403, min: 1.2283 }, pitch: { max: 1.1535, min: 1.1438 }, minor: { max: 1.0517, min: 1.0330 } },
                    '3A': { major: { max: 1.2403, min: 1.2333 }, pitch: { max: 1.1569, min: 1.1535 }, minor: { max: 1.0575, min: 1.0510 } } } },
      '1 1/4-12': { major: 1.250, pitch: 0.0833, series: 'UNF',
        internal: { '2B': { major: { min: 1.2520, max: 1.2597 }, pitch: { min: 1.2112, max: 1.2158 }, minor: { min: 1.1735, max: 1.1834 } },
                    '3B': { major: { min: 1.2520, max: 1.2562 }, pitch: { min: 1.2129, max: 1.2148 }, minor: { min: 1.1769, max: 1.1811 } } },
        external: { '2A': { major: { max: 1.2428, min: 1.2370 }, pitch: { max: 1.2090, min: 1.2038 }, minor: { max: 1.1709, min: 1.1610 } },
                    '3A': { major: { max: 1.2428, min: 1.2390 }, pitch: { max: 1.2110, min: 1.2090 }, minor: { max: 1.1744, min: 1.1702 } } } },
      '1 1/2-6': { major: 1.500, pitch: 0.1667, series: 'UNC',
        internal: { '2B': { major: { min: 1.5020, max: 1.5144 }, pitch: { min: 1.3917, max: 1.3990 }, minor: { min: 1.2764, max: 1.2964 } },
                    '3B': { major: { min: 1.5020, max: 1.5095 }, pitch: { min: 1.3953, max: 1.3983 }, minor: { min: 1.2827, max: 1.2899 } } },
        external: { '2A': { major: { max: 1.4889, min: 1.4769 }, pitch: { max: 1.3874, min: 1.3764 }, minor: { max: 1.2724, min: 1.2504 } },
                    '3A': { major: { max: 1.4889, min: 1.4824 }, pitch: { max: 1.3914, min: 1.3874 }, minor: { max: 1.2787, min: 1.2721 } } } },
      '1 1/2-12': { major: 1.500, pitch: 0.0833, series: 'UNF',
        internal: { '2B': { major: { min: 1.5020, max: 1.5097 }, pitch: { min: 1.4612, max: 1.4658 }, minor: { min: 1.4235, max: 1.4334 } },
                    '3B': { major: { min: 1.5020, max: 1.5062 }, pitch: { min: 1.4629, max: 1.4648 }, minor: { min: 1.4269, max: 1.4311 } } },
        external: { '2A': { major: { max: 1.4928, min: 1.4870 }, pitch: { max: 1.4590, min: 1.4538 }, minor: { max: 1.4209, min: 1.4110 } },
                    '3A': { major: { max: 1.4928, min: 1.4890 }, pitch: { max: 1.4610, min: 1.4590 }, minor: { max: 1.4244, min: 1.4202 } } } }
    }
  },

  // 监听规格选择变化
  onSpecificationChange: function(e) {
    this.setData({
      specificationIndex: e.detail.value
    })
    this.calculateThread();
  },

  // 监听公差选择变化
  onToleranceChange: function(e) {
    this.setData({
      toleranceIndex: e.detail.value
    })
    this.calculateThread();
  },

  // 计算螺纹参数
  calculateThread: function() {
    const specification = this.data.specificationList[this.data.specificationIndex];
    const tolerance = this.data.toleranceList[this.data.toleranceIndex];
    const isExternal = tolerance === '2A' || tolerance === '3A';
    
    // 获取螺纹数据
    const threadData = this.data.threadDataMap[specification];
    if (!threadData) {
      console.error('未找到对应的螺纹数据');
      return;
    }
    
    // 获取公差数据
    const toleranceData = isExternal ? 
      threadData.external[tolerance] : 
      threadData.internal[tolerance];
    
    // 格式化数据
    const formattedData = {
      specification: specification,
      tolerance: tolerance,
      isExternal: isExternal,
      majorDiameter: {
        max: this.formatDimension(toleranceData.major.max),
        min: this.formatDimension(toleranceData.major.min)
      },
      pitchDiameter: {
        max: this.formatDimension(toleranceData.pitch.max),
        min: this.formatDimension(toleranceData.pitch.min)
      },
      minorDiameter: {
        max: this.formatDimension(toleranceData.minor.max),
        min: this.formatDimension(toleranceData.minor.min)
      },
      threadSeries: threadData.series,
      pitch: this.formatDimension(threadData.pitch),
      threadsPerInch: this.formatTPI(1 / threadData.pitch)
    };
    
    this.setData({
      threadData: formattedData
    });
  },

  // 格式化尺寸显示
  formatDimension: function(value) {
    return value.toFixed(4) + '"';
  },

  // 格式化每英寸牙数
  formatTPI: function(value) {
    return value.toFixed(0);
  },

  // 页面加载时计算初始螺纹参数
  onLoad: function() {
    this.calculateThread();
  }
})    