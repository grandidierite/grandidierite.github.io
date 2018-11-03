---
layout: post
title: Classes and Objects in C++ Programming
date: 2018-11-02 15:00:20 +0700
description: Classes, objects, Inheritance, polymorphism, data abstraction, data encapsulation, virtual function and overloading in C++ programming
img: cppclasses.jpg
tags: [C++, Class, Inheritance, Polymorphism, Abstraction, Encapsulation, Overloading]
---
#### Classes and Objects
Classes are an expanded concept of data structures; like data structures, they can contain data members but they can
also contain functions as members.

An object is an instantiation of a class. In terms of variables, a class would be the type, and an object would be the
variable.

A class declaration is similar syntactically to a structure. By default, functions and data declared within a class are
private to that class and can be accessed only by other members of the class. There are three access specifiers in C++:
1. Public
2. Private
3. Protected

<pre>
<code data-language="c">#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

class employee {
// private by default
char name[80];
double wage;

// these are public
public:
    void putname(char *n);
    void getname(char *n);
    void putwage(double w);
    double getwage();
};

void employee::putname(char *n)
{
    strcpy(name, n);
}
void employee::getname(char *n)
{
    strcpy(n, name);
}
void employee::putwage(double w)
{
    wage = w;
}
double employee::getwage()
{
    return wage;
}
int main()
{
    employee ted;
    char name[80];
    ted.putname("Ted Jones");
    ted.putwage(75000);
    ted.getname(name);
    cout &lt;&lt; name &lt;&lt; " makes $";
    cout &lt;&lt; ted.getwage() &lt;&lt; " per year.\n";
    return 0;
}</code>
</pre>

Functions that are declared within a class are called member functions. Variables that are elements of a class are
called member variables or data members.

A public member is accessible from anywhere outside the class but within a program. You can set and get the value of public variables without any member function.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Line {
   public:
      double length;
      void setLength( double len );
      double getLength( void );
};

// Member functions definitions
double Line::getLength(void) {
   return length ;
}

void Line::setLength( double len) {
   length = len;
}

// Main function for the program
int main() {
   Line line;

   // set line length
   line.setLength(6.0);
   cout &lt;&lt; "Length of line : " &lt;&lt; line.getLength() &lt;&lt; endl;

   // set line length without member function
   line.length = 10.0; // OK: because length is public
   cout &lt;&lt; "Length of line : " &lt;&lt; line.length &lt;&lt; endl;

   return 0;
}</code>
</pre>

A private member variable or function cannot be accessed, or even viewed from outside the class. Only the class and friend functions can access private members.

By default all the members of a class would be private.

Practically, we define data in private section and related functions in public section so that they can be called from outside of the class.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Box {
   public:
      double length;
      void setWidth( double wid );
      double getWidth( void );

   private:
      double width;
};

// Member functions definitions
double Box::getWidth(void) {
   return width ;
}

void Box::setWidth( double wid ) {
   width = wid;
}

// Main function for the program
int main() {
   Box box;

   // set box length without member function
   box.length = 10.0; // OK: because length is public
   cout &lt;&lt; "Length of box : " &lt;&lt; box.length &lt;&lt; endl;

   // set box width without member function
   // box.width = 10.0; // Error: because width is private
   box.setWidth(10.0);  // Use member function to set it.
   cout &lt;&lt; "Width of box : " &lt;&lt; box.getWidth() &lt;&lt; endl;

   return 0;
}</code>
</pre>

A protected member variable or function is very similar to a private member but it provided one additional benefit that they can be accessed in child classes which are called derived classes.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Box {
   protected:
      double width;
};

class SmallBox:Box { // SmallBox is the derived class.
   public:
      void setSmallWidth( double wid );
      double getSmallWidth( void );
};

// Member functions of child class
double SmallBox::getSmallWidth(void) {
   return width ;
}

void SmallBox::setSmallWidth( double wid ) {
   width = wid;
}

// Main function for the program
int main() {
   SmallBox box;

   // set box width using member function
   box.setSmallWidth(5.0);
   cout &lt;&lt; "Width of box : "&lt;&lt; box.getSmallWidth() &lt;&lt; endl;

   return 0;
}</code>
</pre>

##### Constructor and Destructor
A class constructor is a special member function of a class that is executed whenever we create new objects of that
class. A constructor will have exact same name as the class and it does not have any return type at all, not even void.
Constructors can be useful for setting initial values for certain member variables.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Line {
   public:
      void setLength( double len );
      double getLength( void );
      Line();  // This is the constructor
   private:
      double length;
};

// Member functions definitions including constructor
Line::Line(void) {
   cout &lt;&lt; "Object is being created" &lt;&lt; endl;
}
void Line::setLength( double len ) {
   length = len;
}
double Line::getLength( void ) {
   return length;
}

// Main function for the program
int main() {
   Line line;

   // set line length
   line.setLength(6.0);
   cout &lt;&lt; "Length of line : " &lt;&lt; line.getLength() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Object is being created
Length of line : 6
</pre>

A default constructor does not have any parameter, but if you need, a constructor can have a parameter.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;
class Line {
   public:
      void setLength( double len );
      double getLength( void );
      Line(double len);  // This is the constructor

   private:
      double length;
};

// Member functions definitions including constructor
Line::Line( double len) {
   cout &lt;&lt; "Object is being created, length = " &lt;&lt; len &lt;&lt; endl;
   length = len;
}
void Line::setLength( double len ) {
   length = len;
}
double Line::getLength( void ) {
   return length;
}

// Main function for the program
int main() {
   Line line(10.0);

   // get initially set length.
   cout &lt;&lt; "Length of line : " &lt;&lt; line.getLength() &lt;&lt; endl;

   // set line length again
   line.setLength(6.0);
   cout &lt;&lt; "Length of line : " &lt;&lt; line.getLength() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Object is being created, length = 10
Length of line : 10
Length of line : 6
</pre>

A destructor is a special member function of a class that is executed whenever an object of it's class goes out of scope or whenever the delete expression is applied to a pointer to the object of that class.

A destructor will have exact same name as the class prefixed with a tilde (~) and it can neither return a value nor can it take any parameters. Destructor can be very useful for releasing resources before coming out of the program like closing files, releasing memories etc.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;
class Line {
   public:
      void setLength( double len );
      double getLength( void );
      Line();   // This is the constructor declaration
      ~Line();  // This is the destructor: declaration

   private:
      double length;
};

// Member functions definitions including constructor
Line::Line(void) {
   cout &lt;&lt; "Object is being created" &lt;&lt; endl;
}
Line::~Line(void) {
   cout &lt;&lt; "Object is being deleted" &lt;&lt; endl;
}
void Line::setLength( double len ) {
   length = len;
}
double Line::getLength( void ) {
   return length;
}

// Main function for the program
int main() {
   Line line;

   // set line length
   line.setLength(6.0);
   cout &lt;&lt; "Length of line : " &lt;&lt; line.getLength() &lt;&lt;endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Object is being created
Length of line : 6
Object is being deleted
</pre>

##### Friend Function
A friend function of a class is defined outside that class scope but it has the right to access all private and
protected members of the class.Even though the prototypes for friend functions appear in the class definition, friends
are not member functions.

A friend can be a function, function template, or member function, or a class, or class template, in which case the
entire class and all of its members are friends.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Box {
   double width;

   public:
      friend void printWidth( Box box );  // friend function
      void setWidth( double wid );
};

// Member function definition
void Box::setWidth( double wid ) {
   width = wid;
}

// Note: printWidth() is not a member function of any class.
void printWidth( Box box ) {
   /* Because printWidth() is a friend of Box, it can
   directly access any member of this class */
   cout &lt;&lt; "Width of box : " &lt;&lt; box.width &lt;&lt;endl;
}

// Main function for the program
int main() {
   Box box;

   // set box width without member function
   box.setWidth(10.0);

   // Use friend function to print the wdith.
   printWidth( box );

   return 0;
}</code>
</pre>

##### Static Members
When we declare a member of a class as static it means no matter how many objects of the class are created , there is
only one copy of the static member.

A static member is shared by all objects of the class. All static data is initialized to zero when the first object is
created, if no other initialization is present.

It can be initialized outside the class by redeclaring the static variable, using the scope resolution operator :: to identify which class it belongs to.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Box {
   public:
      static int objectCount;

      // Constructor definition
      Box(double l = 2.0, double b = 2.0, double h = 2.0) {
         cout &lt;&lt; "Constructor called." &lt;&lt; endl;
         length = l;
         breadth = b;
         height = h;

         // Increase every time object is created
         objectCount++;
      }
      double Volume() {
         return length * breadth * height;
      }

   private:
      double length;     // Length of a box
      double breadth;    // Breadth of a box
      double height;     // Height of a box
};

// Initialize static member of class Box
int Box::objectCount = 0;

int main(void) {
   Box Box1(3.3, 1.2, 1.5);    // Declare box1
   Box Box2(8.5, 6.0, 2.0);    // Declare box2

   // Print total number of objects.
   cout &lt;&lt; "Total objects: " &lt;&lt; Box::objectCount &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Constructor called.
Constructor called.
Total objects: 2
</pre>

By declaring a function member as static, you make it independent of any particular object of the class. A static member function can be called even if no objects of the class exist and the static functions are accessed using only the class name and the scope resolution operator ::.

A static member function can only access static data member, other static member functions and any other functions from outside the class.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

class Box {
   public:
      static int objectCount;

      // Constructor definition
      Box(double l = 2.0, double b = 2.0, double h = 2.0) {
         cout &lt;&lt; "Constructor called." &lt;&lt; endl;
         length = l;
         breadth = b;
         height = h;

         // Increase every time object is created
         objectCount++;
      }
      double Volume() {
         return length * breadth * height;
      }
      static int getCount() {
         return objectCount;
      }

   private:
      double length;     // Length of a box
      double breadth;    // Breadth of a box
      double height;     // Height of a box
};

// Initialize static member of class Box
int Box::objectCount = 0;

int main(void) {
   // Print total number of objects before creating object.
   cout &lt;&lt; "Inital Stage Count: " &lt;&lt; Box::getCount() &lt;&lt; endl;

   Box Box1(3.3, 1.2, 1.5);    // Declare box1
   Box Box2(8.5, 6.0, 2.0);    // Declare box2

   // Print total number of objects after creating object.
   cout &lt;&lt; "Final Stage Count: " &lt;&lt; Box::getCount() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Inital Stage Count: 0
Constructor called.
Constructor called.
Final Stage Count: 2
</pre>

#### Inheritance
Inheritance allows us to define a class in terms of another class, which makes it easier to create and maintain an application.

When creating a class, instead of writing completely new data members and member functions, the programmer can designate that the new class should inherit the members of an existing class. This existing class is called the base class, and the new class is referred to as the derived class.

A class can be derived from more than one classes, which means it can inherit data and functions from multiple base classes. To define a derived class, we use a class derivation list to specify the base class(es).

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

// Base class
class Shape {
   public:
      void setWidth(int w) {
         width = w;
      }
      void setHeight(int h) {
         height = h;
      }

   protected:
      int width;
      int height;
};

// Derived class
class Rectangle: public Shape {
   public:
      int getArea() {
         return (width * height);
      }
};

int main(void) {
   Rectangle Rect;

   Rect.setWidth(5);
   Rect.setHeight(7);

   // Print the area of the object.
   cout &lt;&lt; "Total area: " &lt;&lt; Rect.getArea() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Total area: 35
</pre>

A derived class inherits all base class methods with the following exceptions:
1. Constructors, destructors and copy constructors of the base class.
2. Overloaded operators of the base class.
3. The friend functions of the base class.

When deriving a class from a base class, the base class may be inherited through public, protected or private inheritance.

When deriving a class from a public base class, public members of the base class become public members of the derived class and protected members of the base class become protected members of the derived class. A base class's private members are never accessible directly from a derived class, but can be accessed through calls to the public and protected members of the base class.

When deriving from a protected base class, public and protected members of the base class become protected members of the derived class.

When deriving from a private base class, public and protected members of the base class become private members of the derived class.

A C++ class can inherit members from more than one class.

<pre>
<code data-language="c">#include &lt;iostream&gt;

using namespace std;

// Base class Shape
class Shape {
   public:
      void setWidth(int w) {
         width = w;
      }
      void setHeight(int h) {
         height = h;
      }

   protected:
      int width;
      int height;
};

// Base class PaintCost
class PaintCost {
   public:
      int getCost(int area) {
         return area * 70;
      }
};

// Derived class
class Rectangle: public Shape, public PaintCost {
   public:
      int getArea() {
         return (width * height);
      }
};

int main(void) {
   Rectangle Rect;
   int area;

   Rect.setWidth(5);
   Rect.setHeight(7);

   area = Rect.getArea();

   // Print the area of the object.
   cout &lt;&lt; "Total area: " &lt;&lt; Rect.getArea() &lt;&lt; endl;

   // Print the total cost of painting
   cout &lt;&lt; "Total paint cost: $" &lt;&lt; Rect.getCost(area) &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Total area: 35
Total paint cost: $2450
</pre>

#### Polymorphism
C++ polymorphism means that a call to a member function will cause a different function to be executed depending on the type of object that invokes the function.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Shape {
   protected:
      int width, height;

   public:
      Shape( int a = 0, int b = 0){
         width = a;
         height = b;
      }
      int area() {
         return 0;
      }
};
class Rectangle: public Shape {
   public:
      Rectangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (width * height);
      }
};

class Triangle: public Shape {
   public:
      Triangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (width * height / 2);
      }
};

// Main function for the program
int main() {
   Shape *shape;
   Rectangle rec(10,7);
   Triangle  tri(10,5);

   // store the address of Rectangle
   shape = &rec;

   // call rectangle area.
   cout &lt;&lt; "Rectangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   // store the address of Triangle
   shape = &tri;

   // call triangle area.
   cout &lt;&lt; "Triangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Rectangle class area : 0
Triangle class area : 0
</pre>

The reason for the incorrect output is that the call of the function area() is being set once by the compiler as the version defined in the base class. This is called static resolution of the function call, or static linkage - the function call is fixed before the program is executed. This is also sometimes called early binding because the area() function is set during the compilation of the program.

To solve this problem, precede the declaration of area() in the Shape class with the keyword <code>virtual</code>.

A virtual function is a function in a base class that is declared using the keyword virtual. Defining in a base class a virtual function, with another version in a derived class, signals to the compiler that we don't want static linkage for this function.

What we do want is the selection of the function to be called at any given point in the program to be based on the kind of object for which it is called. This sort of operation is referred to as dynamic linkage, or late binding.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Shape {
   protected:
      int width, height;

   public:
      Shape( int a = 0, int b = 0){
         width = a;
         height = b;
      }
      virtual int area() {
         return 0;
      }
};
class Rectangle: public Shape {
   public:
      Rectangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (width * height);
      }
};

class Triangle: public Shape {
   public:
      Triangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (width * height / 2);
      }
};

// Main function for the program
int main() {
   Shape *shape;
   Rectangle rec(10,7);
   Triangle  tri(10,5);

   // store the address of Rectangle
   shape = &rec;

   // call rectangle area.
   cout &lt;&lt; "Rectangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   // store the address of Triangle
   shape = &tri;

   // call triangle area.
   cout &lt;&lt; "Triangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Rectangle class area : 70
Triangle class area : 25
</pre>

As you can see, each of the child classes has a separate implementation for the function area(). This is how polymorphism is generally used. You have different classes with a function of the same name, and even the same parameters, but with different implementations.

#### Abstract class
A class is made abstract by declaring at least one of its functions as pure virtual function. A pure virtual function is specified by placing "= 0" in its declaration.

The purpose of an abstract class (often referred to as an ABC) is to provide an appropriate base class from which other classes can inherit. Abstract classes cannot be used to instantiate objects and serves only as an interface. Attempting to instantiate an object of an abstract class causes a compilation error.

Thus, if a subclass of an ABC needs to be instantiated, it has to implement each of the virtual functions, which means that it supports the interface declared by the ABC. Failure to override a pure virtual function in a derived class, then attempting to instantiate objects of that class, is a compilation error.

Classes that can be used to instantiate objects are called concrete classes.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

// Base class
class Shape {
   public:
      // pure virtual function providing interface framework.
      virtual int getArea() = 0;
      void setWidth(int w) {
         width = w;
      }

      void setHeight(int h) {
         height = h;
      }

   protected:
      int width;
      int height;
};

// Derived classes
class Rectangle: public Shape {
   public:
      int getArea() {
         return (width * height);
      }
};

class Triangle: public Shape {
   public:
      int getArea() {
         return (width * height)/2;
      }
};

int main(void) {
   Rectangle Rect;
   Triangle  Tri;

   Rect.setWidth(5);
   Rect.setHeight(7);

   // Print the area of the object.
   cout &lt;&lt; "Total Rectangle area: " &lt;&lt; Rect.getArea() &lt;&lt; endl;

   Tri.setWidth(5);
   Tri.setHeight(7);

   // Print the area of the object.
   cout &lt;&lt; "Total Triangle area: " &lt;&lt; Tri.getArea() &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Total Rectangle area: 35
Total Triangle area: 17
</pre>

#### Data Encapsulation & Data Abstraction
Data encapsulation is a mechanism of bundling the data, and the functions that use them and data abstraction is a mechanism of exposing only the interfaces and hiding the implementation details from the user.

Any C++ program where you implement a class with public and private members is an example of data encapsulation and data abstraction.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Adder {
   public:
      // constructor
      Adder(int i = 0) {
         total = i;
      }

      // interface to outside world
      void addNum(int number) {
         total += number;
      }

      // interface to outside world
      int getTotal() {
         return total;
      };

   private:
      // hidden data from outside world
      int total;
};

int main() {
   Adder a;

   a.addNum(10);
   a.addNum(20);
   a.addNum(30);

   cout &lt;&lt; "Total " &lt;&lt; a.getTotal() &lt;&lt; endl;
   return 0;
}</code>
</pre>

#### <code>this</code> Pointer
<code>this</code> pointer is pointer that is accessible only inside the member functions of a class and points to the
object who has called this member function.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Shape {
   protected:
      int width, height;

   public:
      Shape( int a = 0, int b = 0){
         this->width = a;
         this->height = b;
      }
      int area() {
         return 0;
      }
};
class Rectangle: public Shape {
   public:
      Rectangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (this->width * this->height);
      }
};

class Triangle: public Shape {
   public:
      Triangle( int a = 0, int b = 0):Shape(a, b) { }

      int area () {
         return (this->width * this->height / 2);
      }
};

// Main function for the program
int main() {
   Shape *shape;
   Rectangle rec(10,7);
   Triangle  tri(10,5);

   // store the address of Rectangle
   shape = &rec;

   // call rectangle area.
   cout &lt;&lt; "Rectangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   // store the address of Triangle
   shape = &tri;

   // call triangle area.
   cout &lt;&lt; "Triangle class area : " &lt;&lt; shape->area() &lt;&lt; endl;

   return 0;
}</code>
</pre>

<code>this</code> pointer also can be used to return reference to the calling object.

When a reference to a local object is returned, the returned reference can be used to chain function calls on a single object.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Test
{
    private:
       int x;
       int y;
    public:
       Test(int x = 0, int y = 0) { this->x = x; this->y = y; }
       Test &setX(int a) { x = a; return *this; }
       Test &setY(int b) { y = b; return *this; }

    void print() { cout &lt;&lt; "x = " &lt;&lt; x &lt;&lt; " y = " &lt;&lt; y &lt;&lt; endl; }
};

int main()
{
   Test obj1(5, 5);

   // Chained function calls.  All calls modify the same object
   // as the same object is returned by reference
   obj1.setX(10).setY(20);
   obj1.print();

   return 0;
}</code>
</pre>

It produces the following result

<pre>
x = 10 y = 20
</pre>

#### Overloading

C++ allows you to specify more than one definition for a function name or an operator in the same scope, which is called function overloading and operator overloading respectively.

An overloaded declaration is a declaration that is declared with the same name as a previously declared declaration in the same scope, except that both declarations have different arguments and obviously different definition (implementation).

##### Function Overloading

You can have multiple definitions for the same function name in the same scope. The definition of the function must differ from each other by the types and/or the number of arguments in the argument list. You cannot overload function declarations that differ only by return type.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class printData {
   public:
      void print(int i) {
        cout &lt;&lt; "Printing int: " &lt;&lt; i &lt;&lt; endl;
      }
      void print(double  f) {
        cout &lt;&lt; "Printing float: " &lt;&lt; f &lt;&lt; endl;
      }
      void print(char* c) {
        cout &lt;&lt; "Printing character: " &lt;&lt; c &lt;&lt; endl;
      }
};

int main(void) {
   printData pd;

   // Call print to print integer
   pd.print(5);

   // Call print to print float
   pd.print(500.263);

   // Call print to print character
   pd.print("Hello C++");

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Printing int: 5
Printing float: 500.263
Printing character: Hello C++
</pre>

##### Operators Overloading
Overloaded operators are functions with special names: the keyword "operator" followed by the symbol for the operator being defined. Like any other function, an overloaded operator has a return type and a parameter list.

Following is the list of operators which can be overloaded

<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<td>+</td>
<td>-</td>
<td>*</td>
<td>/</td>
<td>%</td>
<td>^</td>
</tr>
<tr>
<td>&amp;</td>
<td>|</td>
<td>~</td>
<td>!</td>
<td>,</td>
<td>=</td>
</tr>
<tr>
<td>&lt;</td>
<td>&gt;</td>
<td>&lt;=</td>
<td>&gt;=</td>
<td>++</td>
<td>--</td>
</tr>
<tr>
<td>&lt;&lt;</td>
<td>&gt;&gt;</td>
<td>==</td>
<td>!=</td>
<td>&amp;&amp;</td>
<td>||</td>
</tr>
<tr>
<td>+=</td>
<td>-=</td>
<td>/=</td>
<td>%=</td>
<td>^=</td>
<td>&amp;=</td>
</tr>
<tr>
<td>|=</td>
<td>*=</td>
<td>&lt;&lt;=</td>
<td>&gt;&gt;=</td>
<td>[]</td>
<td>()</td>
</tr>
<tr>
<td>-&gt;</td>
<td>-&gt;*</td>
<td>new</td>
<td>new []</td>
<td>delete</td>
<td>delete []</td>
</tr>
</tbody></table>

Following is the list of operators, which can not be overloaded

<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<td>::</td>
<td>.*</td>
<td>.</td>
<td>?:</td>
</tr>
</tbody></table>

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Box {
   public:
      double getVolume(void) {
         return length * breadth * height;
      }
      void setLength( double len ) {
         length = len;
      }
      void setBreadth( double bre ) {
         breadth = bre;
      }
      void setHeight( double hei ) {
         height = hei;
      }

      // Overload + operator to add two Box objects.
      Box operator+(const Box& b) {
         Box box;
         box.length = this->length + b.length;
         box.breadth = this->breadth + b.breadth;
         box.height = this->height + b.height;
         return box;
      }

   private:
      double length;      // Length of a box
      double breadth;     // Breadth of a box
      double height;      // Height of a box
};

// Main function for the program
int main() {
   Box Box1;                // Declare Box1 of type Box
   Box Box2;                // Declare Box2 of type Box
   Box Box3;                // Declare Box3 of type Box
   double volume = 0.0;     // Store the volume of a box here

   // box 1 specification
   Box1.setLength(6.0);
   Box1.setBreadth(7.0);
   Box1.setHeight(5.0);

   // box 2 specification
   Box2.setLength(12.0);
   Box2.setBreadth(13.0);
   Box2.setHeight(10.0);

   // volume of box 1
   volume = Box1.getVolume();
   cout &lt;&lt; "Volume of Box1 : " &lt;&lt; volume &lt;&lt; endl;

   // volume of box 2
   volume = Box2.getVolume();
   cout &lt;&lt; "Volume of Box2 : " &lt;&lt; volume &lt;&lt; endl;

   // Add two object as follows:
   Box3 = Box1 + Box2;

   // volume of box 3
   volume = Box3.getVolume();
   cout &lt;&lt; "Volume of Box3 : " &lt;&lt; volume &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Volume of Box1 : 210
Volume of Box2 : 1560
Volume of Box3 : 5400
</pre>

###### Unary operators Overloading
The unary operators operate on a single operand such as
* The increment (++) and decrement (--) operators
* The unary minus (-) operator
* The logical not (!) operator

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12

   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }

      // method to display distance
      void displayDistance() {
         cout &lt;&lt; "F: " &lt;&lt; feet &lt;&lt; " I:" &lt;&lt; inches &lt;&lt; endl;
      }

      // overloaded minus (-) operator
      Distance operator- () {
         feet = -feet;
         inches = -inches;
         return Distance(feet, inches);
      }
};

int main() {
   Distance D1(11, 10), D2(-5, 11);

   -D1;                     // apply negation
   D1.displayDistance();    // display D1

   -D2;                     // apply negation
   D2.displayDistance();    // display D2

   return 0;
}</code>
</pre>

It produces the following result

<pre>
F: -11 I:-10
F: 5 I:-11
</pre>

###### Binary Operators Overloading
The binary operators take two arguments such as
* Addition (+) operator
* Subtraction (-) operator
* Division (/) operator
* Multiplication (*) operator

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Box {
   double length;      // Length of a box
   double breadth;     // Breadth of a box
   double height;      // Height of a box

   public:

   double getVolume(void) {
      return length * breadth * height;
   }

   void setLength( double len ) {
      length = len;
   }

   void setBreadth( double bre ) {
      breadth = bre;
   }

   void setHeight( double hei ) {
      height = hei;
   }

   // Overload + operator to add two Box objects.
   Box operator+(const Box& b) {
      Box box;
      box.length = this->length + b.length;
      box.breadth = this->breadth + b.breadth;
      box.height = this->height + b.height;
      return box;
   }
};

// Main function for the program
int main() {
   Box Box1;                // Declare Box1 of type Box
   Box Box2;                // Declare Box2 of type Box
   Box Box3;                // Declare Box3 of type Box
   double volume = 0.0;     // Store the volume of a box here

   // box 1 specification
   Box1.setLength(6.0);
   Box1.setBreadth(7.0);
   Box1.setHeight(5.0);

   // box 2 specification
   Box2.setLength(12.0);
   Box2.setBreadth(13.0);
   Box2.setHeight(10.0);

   // volume of box 1
   volume = Box1.getVolume();
   cout &lt;&lt; "Volume of Box1 : " &lt;&lt; volume &lt;&lt; endl;

   // volume of box 2
   volume = Box2.getVolume();
   cout &lt;&lt; "Volume of Box2 : " &lt;&lt; volume &lt;&lt; endl;

   // Add two object as follows:
   Box3 = Box1 + Box2;

   // volume of box 3
   volume = Box3.getVolume();
   cout &lt;&lt; "Volume of Box3 : " &lt;&lt; volume &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Volume of Box1 : 210
Volume of Box2 : 1560
Volume of Box3 : 5400
</pre>


###### Relational Operators Overloading
There are various relational operators supported by C++ language like (<, >, <=, >=, ==, etc.) which can be used to compare C++ built-in data types.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12

   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }

      // method to display distance
      void displayDistance() {
         cout &lt;&lt; "F: " &lt;&lt; feet &lt;&lt; " I:" &lt;&lt; inches &lt;&lt; endl;
      }

      // overloaded minus (-) operator
      Distance operator- () {
         feet = -feet;
         inches = -inches;
         return Distance(feet, inches);
      }

      // overloaded < operator
      bool operator <(const Distance& d) {
         if(feet < d.feet) {
            return true;
         }
         if(feet == d.feet && inches < d.inches) {
            return true;
         }

         return false;
      }
};

int main() {
   Distance D1(11, 10), D2(5, 11);

   if( D1 < D2 ) {
      cout &lt;&lt; "D1 is less than D2 " &lt;&lt; endl;
   } else {
      cout &lt;&lt; "D2 is less than D1 " &lt;&lt; endl;
   }

   return 0;
}</code>
</pre>

It produces the following result

<pre>
D2 is less than D1
</pre>

###### Input/Output Operators Overloading
C++ is able to input and output the built-in data types using the stream extraction operator >> and the stream insertion operator &lt;&lt;. The stream insertion and stream extraction operators also can be overloaded to perform input and output for user-defined types like an object.C++ is able to input and output the built-in data types using the stream extraction operator >> and the stream insertion operator &lt;&lt;. The stream insertion and stream extraction operators also can be overloaded to perform input and output for user-defined types like an object.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12

   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }
      friend ostream &operator&lt;&lt;( ostream &output, const Distance &D ) {
         output &lt;&lt; "F : " &lt;&lt; D.feet &lt;&lt; " I : " &lt;&lt; D.inches;
         return output;
      }

      friend istream &operator>>( istream  &input, Distance &D ) {
         input >> D.feet >> D.inches;
         return input;
      }
};

int main() {
   Distance D1(11, 10), D2(5, 11), D3;

   cout &lt;&lt; "Enter the value of object : " &lt;&lt; endl;
   cin >> D3;
   cout &lt;&lt; "First Distance : " &lt;&lt; D1 &lt;&lt; endl;
   cout &lt;&lt; "Second Distance :" &lt;&lt; D2 &lt;&lt; endl;
   cout &lt;&lt; "Third Distance :" &lt;&lt; D3 &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Enter the value of object :
70
10
First Distance : F : 11 I : 10
Second Distance :F : 5 I : 11
Third Distance :F : 70 I : 10
</pre>

###### Increment And Decrement Operators Overloading

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Time {
   private:
      int hours;             // 0 to 23
      int minutes;           // 0 to 59

   public:
      // required constructors
      Time() {
         hours = 0;
         minutes = 0;
      }
      Time(int h, int m) {
         hours = h;
         minutes = m;
      }

      // method to display time
      void displayTime() {
         cout &lt;&lt; "H: " &lt;&lt; hours &lt;&lt; " M:" &lt;&lt; minutes &lt;&lt; endl;
      }

      // overloaded prefix ++ operator
      Time operator++ () {
         ++minutes;          // increment this object
         if(minutes >= 60) {
            ++hours;
            minutes -= 60;
         }
         return Time(hours, minutes);
      }

      // overloaded postfix ++ operator
      Time operator++( int ) {

         // save the orignal value
         Time T(hours, minutes);

         // increment this object
         ++minutes;

         if(minutes >= 60) {
            ++hours;
            minutes -= 60;
         }

         // return old original value
         return T;
      }
};

int main() {
   Time T1(11, 59), T2(10,40);

   ++T1;                    // increment T1
   T1.displayTime();        // display T1
   ++T1;                    // increment T1 again
   T1.displayTime();        // display T1

   T2++;                    // increment T2
   T2.displayTime();        // display T2
   T2++;                    // increment T2 again
   T2.displayTime();        // display T2
   return 0;
}</code>
</pre>

It produces the following result

<pre>
H: 12 M:0
H: 12 M:1
H: 10 M:41
H: 10 M:42
</pre>

###### Assignment Operator Overloading
You can overload the assignment operator (=) just as you can other operators and it can be used to create an object just like the copy constructor.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12

   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }
      void operator = (const Distance &D ) {
         feet = D.feet;
         inches = D.inches;
      }

      // method to display distance
      void displayDistance() {
         cout &lt;&lt; "F: " &lt;&lt; feet &lt;&lt;  " I: " &lt;&lt;  inches &lt;&lt; endl;
      }
};

int main() {
   Distance D1(11, 10), D2(5, 11);

   cout &lt;&lt; "First Distance : ";
   D1.displayDistance();
   cout &lt;&lt; "Second Distance : ";
   D2.displayDistance();

   // use assignment operator
   D1 = D2;
   cout &lt;&lt; "First Distance : ";
   D1.displayDistance();

   return 0;
}</code>
</pre>

It produces the following result

<pre>
First Distance : F: 11 I: 10
Second Distance : F: 5 I: 11
First Distance : F: 5 I: 11
</pre>

###### Function Call Operator Overloading
The function call operator () can be overloaded for objects of class type. When you overload (), you are not creating a new way to call a function. Rather, you are creating an operator function that can be passed an arbitrary number of parameters.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;

class Distance {
   private:
      int feet;             // 0 to infinite
      int inches;           // 0 to 12

   public:
      // required constructors
      Distance() {
         feet = 0;
         inches = 0;
      }
      Distance(int f, int i) {
         feet = f;
         inches = i;
      }

      // overload function call
      Distance operator()(int a, int b, int c) {
         Distance D;

         // just put random calculation
         D.feet = a + c + 10;
         D.inches = b + c + 100 ;
         return D;
      }

      // method to display distance
      void displayDistance() {
         cout &lt;&lt; "F: " &lt;&lt; feet &lt;&lt; " I: " &lt;&lt; inches &lt;&lt; endl;
      }
};

int main() {
   Distance D1(11, 10), D2;

   cout &lt;&lt; "First Distance : ";
   D1.displayDistance();

   D2 = D1(10, 10, 10); // invoke operator()
   cout &lt;&lt; "Second Distance : ";
   D2.displayDistance();

   return 0;
}</code>
</pre>

It produces the following result

<pre>
First Distance : F: 11 I: 10
Second Distance :F: 30 I: 120
</pre>

###### Subscripting Operator Overloading
The subscript operator [] is normally used to access array elements. This operator can be overloaded to enhance the existing functionality of C++ arrays.

<pre>
<code data-language="c">#include &lt;iostream&gt;
using namespace std;
const int SIZE = 10;

class safearay {
   private:
      int arr[SIZE];

   public:
      safearay() {
         register int i;
         for(i = 0; i < SIZE; i++) {
           arr[i] = i;
         }
      }

      int &operator[](int i) {
         if( i > SIZE ) {
            cout &lt;&lt; "Index out of bounds" &lt;&lt; endl;
            // return first element.
            return arr[0];
         }

         return arr[i];
      }
};

int main() {
   safearay A;

   cout &lt;&lt; "Value of A[2] : " &lt;&lt; A[2] &lt;&lt; endl;
   cout &lt;&lt; "Value of A[5] : " &lt;&lt; A[5] &lt;&lt; endl;
   cout &lt;&lt; "Value of A[12] : " &lt;&lt; A[12] &lt;&lt; endl;

   return 0;
}</code>
</pre>

It produces the following result

<pre>
Value of A[2] : 2
Value of A[5] : 5
Index out of bounds
Value of A[12] : 0
</pre>

###### Class Member Access Operator Overloading
The operator-> is used often in conjunction with the pointer-dereference operator * to implement "smart pointers." These pointers are objects that behave like normal pointers except they perform other tasks when you access an object through them, such as automatic object deletion either when the pointer is destroyed, or the pointer is used to point to another object.

<pre>
<code data-language="c">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

// Consider an actual class.
class Obj {
   static int i, j;

public:
   void f() const { cout &lt;&lt; i++ &lt;&lt; endl; }
   void g() const { cout &lt;&lt; j++ &lt;&lt; endl; }
};

// Static member definitions:
int Obj::i = 10;
int Obj::j = 12;

// Implement a container for the above class
class ObjContainer {
   vector<Obj*> a;

   public:
      void add(Obj* obj) {
         a.push_back(obj);  // call vector's standard method.
      }
      friend class SmartPointer;
};

// implement smart pointer to access member of Obj class.
class SmartPointer {
   ObjContainer oc;
   int index;

   public:
      SmartPointer(ObjContainer& objc) {
         oc = objc;
         index = 0;
      }

      // Return value indicates end of list:
      bool operator++() { // Prefix version
         if(index >= oc.a.size()) return false;
         if(oc.a[++index] == 0) return false;
         return true;
      }

      bool operator++(int) { // Postfix version
         return operator++();
      }

      // overload operator->
      Obj* operator->() const {
         if(!oc.a[index]) {
            cout &lt;&lt; "Zero value";
            return (Obj*)0;
         }

         return oc.a[index];
      }
};

int main() {
   const int sz = 10;
   Obj o[sz];
   ObjContainer oc;

   for(int i = 0; i < sz; i++) {
      oc.add(&o[i]);
   }

   SmartPointer sp(oc); // Create an iterator
   do {
      sp->f(); // smart pointer call
      sp->g();
   } while(sp++);

   return 0;
}</code>
</pre>

It produces the following result

<pre>
10
12
11
13
12
14
13
15
14
16
15
17
16
18
17
19
18
20
19
21
</pre>