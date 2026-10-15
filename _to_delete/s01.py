import sys
p=sys.argv[1]; s=open(p).read()
a='''<p className="eyebrow" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Giới thiệu Việt Nam · Nhóm 7</p>'''
assert s.count(a)==1
s=s.replace(a,'''<p className="eyebrow" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties} aria-label="Giới thiệu Việt Nam · Nhóm 7"><span><SplitText text="Giới thiệu Việt Nam · Nhóm 7" start={0} /></span></p>''')
a='''<p className="sub" data-a="slideL" style={{ "--d": "1.1s" } as CSSProperties}>Cơm tấm Sài Gòn</p>'''
assert s.count(a)==1
s=s.replace(a,'''<p className="sub" data-a="slideL" style={{ "--d": "1.1s" } as CSSProperties} aria-label="Cơm tấm Sài Gòn"><SplitText text="Cơm tấm Sài Gòn" start={0} /></p>''')
open(p,'w').write(s); print('ok')
