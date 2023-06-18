a = {}

lst = [1,2,4,4,6,2,2,3,5]
str1 = "My Name is Tanmoy. And he is great."

lst = str1.split(' ')

for i in lst:
    if i in a:
        a[i] = a[i] + 1
    else:
        a[i] = 1
    
print(sorted(a))    

for i in reversed(lst):
    print(i)

print(list(reversed(lst)))