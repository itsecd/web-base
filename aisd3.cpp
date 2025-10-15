#include <iostream>

struct node{
    int value;
    node* next;
}

double average(node* head1){
    node* head=head1;
    int sum=0,count=0;
    while (head->next){
        sum+=head->value;
        count++;
        head=head->next;
    } 
    return (count!=0)  ? sum/count:0;
}

bool list_up(node* head){
    node* cur=head;
    while(cur->next){
        if(cur->next->value <= cur->value){
            return false;
        }
        else{
            return true;
        }
    }
}

void print_duplicate(node* head){
    node* current=head;
    while (head->next){
        int current_data=current->value;
        node* current1=current->next;
        while(current1){
            if(current_data==current1->value){
                std::cout<<current_data<"\n";
                break;
            }
        }
    }
}
void delete_dupe(node* head){
    node* current=head;
    while (current->next){
        node* cur=current->next;
        while(cur){
            if(current!=cur){
                cur=cur->next;
            }
        }
    }
}