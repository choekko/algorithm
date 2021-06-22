#include <stdio.h>


int main(void) {
	int tmp = 2;
	int *a;
	a = &tmp;
	tmp++;
	printf("%d", *a);
}
