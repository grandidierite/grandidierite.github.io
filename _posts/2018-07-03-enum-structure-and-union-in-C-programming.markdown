---
layout: post
title: Enums, Structures, and Unions in C Programming
date: 2018-07-03 09:32:20 +0700
description: Enums, Structures, and Unions in C Programming
img: enum.jpg
tags: [C]
---
##### Enumerated Type
C provides special types called enumerated types or <code>enum</code> to declare symbolic names that represent integer
constants. Its main purpose is to enhance the readability of the code.

For example, we can declare an enumeration for colors as follows

<pre>
<code data-language="c">enum color { RED, GREEN, BLUE };</code>
</pre>

By default, the value of the first enumeration member is 0, that of the second member is 1 and so on.

We can also change the default value and assign any value of our choice to an element of enum. Once we change the
default value of any enum element, then the values of all the elements after it will also be changed accordingly.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

enum days{ SUNDAY, MONDAY, TUESDAY = 5, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY};

int main() {
   enum days today;
   today = THURSDAY;
   printf("%d\n", today);

   return 0;
}</code>
</pre>

In the above example, we define the value of <code>TUESDAY</code> as 5. So the values of <code>WEDNESDAY</code>, <code>THURSDAY</code>, <code>FRIDAY</code> and <code>SATURDAY</code> will become 6, 7, 8 and 9 respectively.

If you declare a variable with enumeration type, the value of that variable must be one of the values of the enumeration elements.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
   enum color { RED, GREEN, BLUE };

   enum color favorite_color;

   /* ask user to choose color */
   printf("Please choose your favorite color: (1. red, 2. green, 3. blue): ");
   scanf("%d", &favorite_color);

   /* print out the result */
   switch (favorite_color)
   {
   case RED:
       printf("your favorite color is Red\n");
       break;
   case GREEN:
       printf("your favorite color is Green\n");
       break;
   case BLUE:
       printf("your favorite color is Blue\n");
       break;
   default:
       printf("you did not choose any color\n");
   }

   return 0;
}</code>
</pre>

Two enumeration element names can have the same value.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

enum state {WORKING = 1, FAILED = 0, FREEZE = 0};

int main() {
   printf("%d, %d, %d\n", WORKING, FAILED, FREEZE);

   return 0;
}</code>
</pre>

##### Structure
Structure is user-defined data type in C language which allows us to combine data of different types together.

Let's define a simple structure called student.

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
};</code>
</pre>

We have defined a structure called <code>student</code> which have three structure members <code>name</code>, <code>roll_no</code>, and <code>marks</code>.

Structure variables can be declared in two ways:

<p>1. Declaring structure variables separately</p>

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
};

struct student student1, student2;      //declaring variables of struct student</code>
</pre>

<p>2. Declaring structure variables with structure definition</p>

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
}; student1, student2;</code>
</pre>

Like a variable of any other data type, structure variable can be initialized as follows.

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
} student1 = {"Jim", 14, 89}, student2 = {"Tim", 10, 82};</code>
</pre>

or

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
};

struct student student1 = {"Jim", 14, 89}, student2 = {"Tim", 10, 82};</code>
</pre>

or

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
}

//initialization of each member separately
struct student student1;
student1.name = "Jim";
student1.roll_no = 14;
student1.marks = 89;</code>
</pre>

Another important thing to understand is we're not allowed to initialize members at the time of defining structure.

<pre>
<code data-language="c">struct student
{
    char name[20] = "Phil"; // invalid
    int roll_no = 10; // invalid
    float marks = 3.14; // invalid
};</code>
</pre>

Defining a structure only creates a template, no memory is allocated until structure variables are created.

We can also assign a structure variable to another structure variable of the same type.

<pre>
<code data-language="c">struct student
{
    char name[20];
    int roll_no;
    float marks;
};

struct student student1 = {"Jon", 44, 96}, student2;

student2 = student1;</code>
</pre>

The following example shows how we can define a structure and read values of structure members.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;string.h&gt;

struct student
{
    char name[20];
    int roll_no;
    float marks;
};

int main()
{
    struct student student_1 = {"Jim", 10, 34.5}, student_2, student_3;

    printf("Details of student 1\n\n");

    printf("Name: %s\n", student_1.name);
    printf("Roll no: %d\n", student_1.roll_no);
    printf("Marks: %.2f\n", student_1.marks);

    printf("\n");

    printf("Enter name of student2: ");
    scanf("%s", student_2.name);

    printf("Enter roll no of student2: ");
    scanf("%d", &student_2.roll_no);

    printf("Enter marks of student2: ");
    scanf("%f", &student_2.marks);

    printf("\nDetails of student 2\n\n");

    printf("Name: %s\n", student_2.name);
    printf("Roll no: %d\n", student_2.roll_no);
    printf("Marks: %.2f\n", student_2.marks);
    strcpy(student_3.name, "King");
    student_3.roll_no = ++student_2.roll_no;
    student_3.marks = student_2.marks + 10;

    printf("\nDetails of student 3\n\n");

    printf("Name: %s\n", student_3.name);
    printf("Roll no: %d\n", student_3.roll_no);
    printf("Marks: %.2f\n", student_3.marks);


    return 0;
}</code>
</pre>

Expected ouput:

<pre>
Details of student 1

Name: Jim
Roll no: 10
Marks: 34.50

Enter name of student2: jack
Enter roll no of student2: 33
Enter marks of student2: 15.21

Details of student 2

Name: jack
Roll no: 33
Marks: 15.21

Details of student 3

Name: King
Roll no: 34
Marks: 25.21
</pre>

To make code clear, you can use <code>typedef</code> keyword to create a synonym for a structure. One advantage by doing this is that you don't have to write <code>struct</code> every time you declare a variable of this type.

<pre>
<code data-language="c">typedef struct _student {
    char name[20];
    int roll_no;
    float marks;
} student;

student student1, student2;      //declaring variables of struct _student</code>
</pre>

We can also declare an array of structure variables. Here is how we can declare and initialize an array of <code>structure student</code>

<pre>
<code data-language="c">struct car arr_student[2] = {
    {"Jim", 14, 89},
    {"Tim", 10, 70}
};</code>
</pre>

Let's take a look a complete example of array of structure variables.

<pre>
<code data-language="c">#include &lt;stdio.h&gt;

typedef struct _student{
    char name[20];
    int roll_no;
    float marks;
} student;

void print_list(student arr_student[], int size);
void read_list(student arr_student[], int size);

int main(){

    const int SIZE = 3;
    student arr_student[SIZE];
    read_list(arr_student, SIZE);
    print_list(arr_student, SIZE);

    return 0;
}

void read_list(student arr_student[], int size)
{
    printf("Please enter the student information:\n");

    for(int i = 0; i < size; i++){
        printf("Enter name: ");
        scanf(" %s", arr_student[i].name);  //Space before %s removes any white space (blanks, tabs, or newlines)

        printf("Enter roll no: ");
        scanf("%d", &arr_student[i].roll_no);

        printf("Enter marks: ");
        scanf("%f", &arr_student[i].marks);

        printf("\n");
    }

}

void print_list(student arr_student[], int size){
    printf("Students' information:\n");
    printf("Name\tRoll no\tMarks\n");

    for(int i = 0; i < size; i++){
        printf("%s\t%d\t%.2f\n", arr_student[i].name, arr_student[i].roll_no, arr_student[i].marks);
    }
}</code>
</pre>

The following example asks the user to enter name, roll no and marks in 2 subjects and calculates the average marks of each student.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
#define MAX 2
#define SUBJECTS 2

struct student
{
    char name[20];
    int roll_no;
    float marks[SUBJECTS];
};

int main()
{
    struct student arr_student[MAX];
    int i, j;
    float sum = 0;

    for(i = 0; i < MAX; i++ )
    {
        printf("\nEnter details of student %d\n\n", i+1);

        printf("Enter name: ");
        scanf("%s", arr_student[i].name);

        printf("Enter roll no: ");
        scanf("%d", &arr_student[i].roll_no);

        for(j = 0; j < SUBJECTS; j++)
        {
            printf("Enter marks: ");
            scanf("%f", &arr_student[i].marks[j]);
        }
    }

    printf("\n");

    printf("Name\tRoll no\tAverage\n\n");

    for(i = 0; i < MAX; i++ )
    {
        sum = 0;

        for(j = 0; j < SUBJECTS; j++)
        {
            sum += arr_student[i].marks[j];
        }
        printf("%s\t%d\t%.2f\n",
             arr_student[i].name, arr_student[i].roll_no, sum/SUBJECTS);
    }

    // signal to operating system program ran fine
    return 0;
}</code>
</pre>

A structure can be nested inside another structure.

<pre>
<code data-language="c">struct student
{
    struct person
    {
        char name[20];
        int age;
        char dob[10];
     } p ;

    int rollno;
    float marks;
} stu;</code>
</pre>

Instead of defining the structure inside another structure. We can define it outside and then declare its variable inside the structure where we want to use it.

<pre>
<code data-language="c">struct person
{
    char name[20];
    int age;
    char dob[10];
};

struct student
{
    struct person info;
    int rollno;
    float marks;
}</code>
</pre>

Nesting of structure within itself is not allowed.

<pre>
<code data-language="c">struct citizen
{
    char name[50];
    char address[100];
    int age;
    int ssn;
    struct citizen relative; // invalid
};</code>
</pre>

Here is how to initialize a nested structure.

<pre>
<code data-language="c">struct person
{
    char name[20];
    int age;
    char dob[10];
};

struct student
{
    struct person info;
    int rollno;
    float marks[10];
}

struct student student_1 = {
   {"Adam", 25, 1990},
   101,
   90
};</code>
</pre>

The following example shows how to use nested structures.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct person
{
    char name[20];
    int age;
    char dob[10];
};

struct student
{
    struct person info;
    int roll_no;
    float marks;
};

int main()
{
    struct student s1;

    printf("Details of student: \n\n");

    printf("Enter name: ");
    scanf("%s", s1.info.name);

    printf("Enter age: ");
    scanf("%d", &s1.info.age);

    printf("Enter dob: ");
    scanf("%s", s1.info.dob);

    printf("Enter roll no: ");
    scanf("%d", &s1.roll_no);

    printf("Enter marks: ");
    scanf("%f", &s1.marks);

    printf("\n*******************************\n\n");

    printf("Name: %s\n", s1.info.name);
    printf("Age: %d\n", s1.info.age);
    printf("DOB: %s\n", s1.info.dob);
    printf("Roll no: %d\n", s1.roll_no);
    printf("Marks: %.2f\n", s1.marks);

    return 0;
}</code>
</pre>

We can have a pointer to structures. Here is the example for a pointer to structure

<pre>
<code data-language="c">#include&lt;stdio.h&gt;
struct dog
{
    char name[10];
    char breed[10];
    int age;
    char color[10];
};

int main()
{
    struct dog my_dog = {"tyke", "Bulldog", 5, "white"};
    struct dog *ptr_dog;
    ptr_dog = &my_dog;

    printf("Dog's name: %s\n", ptr_dog->name);
    printf("Dog's breed: %s\n", ptr_dog->breed);
    printf("Dog's age: %d\n", ptr_dog->age);
    printf("Dog's color: %s\n", ptr_dog->color);

    // changing the name of dog from tyke to jack
    strcpy(ptr_dog->name, "jack");

    // increasing age of dog by 1 year
    ptr_dog->age++;

    printf("Dog's new name is: %s\n", ptr_dog->name);
    printf("Dog's age is: %d\n", ptr_dog->age);

    return 0;
}</code>
</pre>

Output:

<pre>
Dog's name: tyke
Dog's breed: Bulldog
Dog's age: 5
Dog's color: white

After changes

Dog's new name is: jack
Dog's age is: 6
</pre>

We can also have a pointer as a member of the structure.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct student
{
    char *name;
    int age;
    char *program;
    char *subjects[5];
};

int main()
{
  struct student stu = {
     "Lucy",
     25,
     "CS",
     {"CS-01", "CS-02", "CS-03", "CS-04", "CS-05" }
  };

  struct student *ptr_stu = &stu;
  int i;

  printf("Accessing members using structure variable: \n\n");

  printf("Name: %s\n", stu.name);
  printf("Age: %d\n", stu.age);
  printf("Program enrolled: %s\n", stu.program);

  for(i = 0; i < 5; i++)
  {
      printf("Subject : %s \n", stu.subjects[i]);
  }

  printf("\n\nAccessing members using pointer variable: \n\n");

  printf("Name: %s\n", ptr_stu->name);
  printf("Age: %d\n", ptr_stu->age);
  printf("Program enrolled: %s\n", ptr_stu->program);

  for(i = 0; i < 5; i++)
  {
      printf("Subject : %s \n", ptr_stu->subjects[i]);
  }

  return 0;
}</code>
</pre>

Output:

<pre>
Accessing members using structure variable:

Name: Lucy
Age: 25
Program enrolled: CS
Subject : CS-01
Subject : CS-02
Subject : CS-03
Subject : CS-04
Subject : CS-05
Accessing members using pointer variable:

Name: Lucy
Age: 25
Program enrolled: CS
Subject : CS-01
Subject : CS-02
Subject : CS-03
Subject : CS-04
Subject : CS-05
</pre>

We can pass individual members of structure to a function just like ordinary variables.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct student
{
    char name[20];
    int roll_no;
    int marks;
};

void print_struct(char name[], int roll_no, int marks);

int main()
{
    struct student stu = {"Tim", 1, 78};
    print_struct(stu.name, stu.roll_no, stu.marks);
    return 0;
}

void print_struct(char name[], int roll_no, int marks)
{
    printf("Name: %s\n", name);
    printf("Roll no: %d\n", roll_no);
    printf("Marks: %d\n", marks);
    printf("\n");
}</code>
</pre>

Output:

<pre>
Name: Tim
Roll no: 1
Marks: 78
</pre>

We can pass structure variable as an argument to the function

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct student
{
    char name[20];
    int roll_no;
    int marks;
};

void print_struct(struct student stu);

int main()
{
    struct student stu = {"George", 10, 69};
    print_struct(stu);
    return 0;
}

void print_struct(struct student stu)
{
    printf("Name: %s\n", stu.name);
    printf("Roll no: %d\n", stu.roll_no);
    printf("Marks: %d\n", stu.marks);
    printf("\n");
}</code>
</pre>

Output:

<pre>
Name: George
Roll no: 10
Marks: 69
</pre>

We can also pass structure pointers as arguments to a function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct employee
{
    char name[20];
    int age;
    char doj[10]; // date of joining
    char designation[20];
};

void print_struct(struct employee *);

int main()
{
    struct employee dev = {"Jane", 25, "25/2/2015", "Developer"};
    print_struct(&dev);

    return 0;
}

void print_struct(struct employee *ptr)
{
    printf("Name: %s\n", ptr->name);
    printf("Age: %d\n", ptr->age);
    printf("Date of joining: %s\n", ptr->doj);
    printf("Age: %s\n", ptr->designation);
    printf("\n");
}</code>
</pre>

Output:

<pre>
Name: Jin
Age: 25
Date of joining: 25/2/2015
Age: Developer
</pre>

We can pass an array of structures to a function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct company
{
    char name[20];
    char ceo[20];
    float revenue; // in $
    float pps; // price per stock in $
};

void print_struct(const struct company str_arr[]);

int main()
{
    struct company companies[3] = {
       {"Country Books", "Tim Green", 999999999, 1300 },
       {"Country Cooks", "Jim Green", 9999999, 700 },
       {"Country Hooks", "Sim Green", 99999, 300 },
    };
    print_struct(companies);

    return 0;
}

void print_struct(struct company str_arr[])
{
    int i;

    for(i= 0; i<3; i++)
    {
        printf("Name: %s\n", str_arr[i].name);
        printf("CEO: %d\n", str_arr[i].ceo);
        printf("Revenue: %.2f\n", str_arr[i].revenue);
        printf("Price per stock : %.2f\n", str_arr[i].pps);
        printf("\n");
    }
}</code>
</pre>

Output:

<pre>
Name: Country Books
CEO: 2686660
Revenue: 1000000000.00
Price per stock : 1300.00

Name: Country Cooks
CEO: 2686708
Revenue: 9999999.00
Price per stock : 700.00

Name: Country Hooks
CEO: 2686756
Revenue: 99999.00
Price per stock : 300.00
</pre>

We can return a structure from a function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct player
{
    char name[20];
    float height;
    float weight;
    float fees;
};

void print_struct(struct player p);
struct player deduct_fees(struct player p);

int main()
{
    struct player p = {"Joe", 5.9, 59, 5000 };
    print_struct(p);
    p = deduct_fees(p);
    print_struct(p);

    return 0;
}

struct player deduct_fees(struct player p)
{
    p.fees -= 1000;
    return p;
}

void print_struct(const struct player p)
{
    printf("Name: %s\n", p.name);
    printf("Height: %.2f\n", p.height);
    printf("Weight: %.2f\n", p.weight);
    printf("Fees: %.2f\n", p.fees);

    printf("\n");
}</code>
</pre>

Output:

<pre>
Name: Joe
Height: 5.90
Weight: 59.00
Fees: 5000.00

Name: Joe
Height: 5.90
Weight: 59.00
Fees: 4000.00
</pre>

We can also return structure pointers from a function.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

struct movie
{
    char title[20];
    char language[20];
    char director[20];
    int year;
    int rating;
};

void print_struct(const struct movie *p);
struct movie *add_rating(struct movie *p);

int main()
{
    struct movie m = {"The Accountant", "English" , "Gavin O'Connor", 2016, 1000};
    struct movie *ptr_m1 = &m, *ptr_m2;

    print_struct(ptr_m1);
    ptr_m2 = add_rating(ptr_m1);
    print_struct(ptr_m2);

    return 0;
}

struct movie *add_rating(struct movie *p)
{
    p->rating++; // increment rating by 1
    return p;
}

void print_struct(const struct movie *p)
{
    printf("Title: %s\n", p->title);
    printf("Language: %s\n", p->language);
    printf("Director: %s\n", p->director);
    printf("Year: %d\n", p->year);
    printf("Rating: %d\n", p->rating);

    printf("\n");
}</code>
</pre>

Output:

<pre>
Title: The Accountant
Language: English
Director: Gavin O'Connor
Year: 2016
Rating: 1000

Title: The Accountant
Language: English
Director: Gavin O'Connor
Year: 2016
Rating: 1001
</pre>

##### Union
Like structures, unions are used to create new data types. The important difference between structures and unions is
that in structures each member has its own memory whereas members in unions share the same memory. When a variable of
type union is declared the compiler allocates memory sufficient to hold the largest member of the union. Since all
members share the same memory you can only use one member of a union at a time.

The following example shows how to use a union

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

union data
{
    int var1;
    double var2;
    char var3;
};

int main()
{
    union data t;

    t.var1 = 10;
    printf("t.var1 = %d\n", t.var1);

    t.var2 = 20.34;
    printf("t.var2 = %f\n", t.var2);

    t.var3 = 'a';
    printf("t.var3 = %c\n", t.var3);

    printf("\nSize of union: %d", sizeof(t));

    return 0;
}</code>
</pre>

We can also initialize the union variable at the time of declaration. Since union shares the same memory we can only initialize one of the members of the union at the time of declaration and it can only initialize the first member of the union.

<pre>
<code data-language="c">union data
{
    int var1;
    double var2;
    char var3;
};

union data j = {10};</code>
</pre>

Designated initializer allows us to set the value of a member other than the first member of the union. Here is how we can do it.

<pre>
<code data-language="c">union data
{
    int var1;
    double var2;
    char var3;
};

union data k = {.var2 = 9.14 };</code>
</pre>

The following example shows how we can use a union as a member of the structure.

<pre>
<code data-language="c">#include&lt;stdio.h&gt;

union quantity
{
    int count;
    float weight;
    float volume;
};

struct goods
{
    char name[20];
    union quantity q;
};

int main()
{
    struct goods g1 = { "apple", {.weight=2.5} };
    struct goods g2 = { "balls", {.count=100} };

    printf("Goods name: %s\n", g1.name);
    printf("Goods quantity: %.2f\n\n", g1.q.weight);

    printf("Goods name: %s\n", g2.name);
    printf("Goods quantity: %d\n\n", g2.q.count);

    return 0;
}</code>
</pre>

Output:

<pre>
Goods name: apple
Goods quantity: 2.50

Goods name: balls
Goods quantity: 100
</pre>