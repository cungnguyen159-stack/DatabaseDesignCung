# Week 5 Homework: Personalized Relational Algebra

**Student:** Doan
**Student ID:** S004
**Favorite Number:** 88

## My Data Record

```
S004,Doan,88,Rivers flow steadily downstream carrying nutrients to fertile valleys and coastal plains.
```

## Part 1: Word Extraction Queries (40 points)

### Query 1: Find My Record

**Expression:** σstudentName = 'Doan'(StudentData)
**Result:** S004, Doan, 88, Rivers flow steadily downstream carrying nutrients to fertile valleys and coastal plains.

### Query 2: Extract 3rd Word

**My 3rd word:** steadily
**Expression:** πWORD(randomParagraph, 3)(σstudentName='Doan'(StudentData))
**Explanation:** Use extended relational algebra function WORD(s, n) to extract the 3rd word.

### Query 3: Extract 7th Word

**My 7th word:** to
**Expression:** πWORD(randomParagraph, 7)(σstudentName='Doan'(StudentData))
**Explanation:** Use extended relational algebra function WORD(s, n) to extract the 7rd word.

### Query 4: Students with favoriteNumber > mine

**Expression:** σfavoriteNumber > 88(StudentData)

### Query 5: Students with favoriteNumber < mine

**Expression:** σfavoriteNumber < 88(StudentData)

### Query 6: Students whose randomParagraph contains my 3rd word

**Expression:** σCONTAINS(randomParagraph, 'steadily')(StudentData)

### Query 7: Project names + favorite numbers for students with numbers between 20 and 50

**Expression:** πstudentName, favoriteNumber(σ20 ≤ favoriteNumber ≤ 50(StudentData))

### Query 8: Find MY favoriteNumber using only my student_id

**Expression:** πfavoriteNumber(σstudent_id='S004'(StudentData))

## Part 2: Set Operations and Multi-Record Comparisons (70 points)

### Query 9: Union of two groups (10 pts)

**Expression:** σfavoriteNumber > 50(StudentData) ∪ σfavoriteNumber < 10(StudentData)

### Query 10: Set Difference

**Expression:** StudentData − σ20 ≤ favoriteNumber ≤ 80(StudentData)

### Query 11: Intersection

**Expression:** σfavoriteNumber > 30(StudentData) ∩ σfavoriteNumber < 70(StudentData)

### Query 12: Complex projection (10 pts)

**Expression:** πstudent_id, studentName(σfavoriteNumber % 2 = 0(StudentData))

### Query 13: Multi-condition selection

**Expression:** σfavoriteNumber = 88 ∧ studentName ≠ 'Doan'(StudentData)

### Query 14: Comprehensive query (10 pts)

**Expression:** σ78 ≤ favoriteNumber ≤ 98(StudentData)
**Result:** 20 students
