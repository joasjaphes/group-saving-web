## ALGORITHM TO SOLVE THE FOLLOWING ISSUE:
1. ALIGN PERMISSION
    - First understand each member permission scope
    - understand which method/function need a certain member permission
    - check permission array that contain members id
    - if currentLoginMember.ID is in one of the permission memberID array return this member
        - declare varible related to this permission and assigned to ``true``

    - In template if variable related to a specific permision is true then show this member a button to trigger some method.
    


2. ENABLE CHAIRPERSOM TO REMOVE USER.
    - First User should be Logged
    - Check user role
    - if user role is ``chairperson`` then show ``delete`` button otherwise hide it.
    - if delete button clicked show warning msg to ask Chairperson for confirmation.
    - if confirmation is ``YES`` then trigger ``onMemberGroupDelete()`` method.
        - onMemeberGroupMethod()
            - accepts member id and groupID
            - delete member from group where groupid=groupID and memberID=member_id..
            - return true 
    - if onMemberGroupDelete() is true then show succesfully msg.


    - check where is permission saved;


## PERMISSION SCOPE
- Chairperson
    - Can add: member contribution
    - Can delete user
    - can delete group
    - can assign role to other member
    - Approve Loan
    - Reset Member Password
- Secretary (Meeting Manager)
    - Manage meeting
    - Serve Members (Reset Password)

- Contribution manager
    - Only add new member contribution include (fine,loan returns, social contribution)
    - Get Notified when user add him/herself contribution




## BEFORE PUSHING CHANGES INTO CLOUD
- make sure you communicate with tester button.
    - I add it into shared-layout.component.html found on shared/component/shared-layout



### ========================================= JOURNALING ========================================================= !!

## TODAY (31 AUG 2023)
- only top leader should be able to see ``setting`` menu-item
    - 0942: I start by opening project on text editor(VSCode) 
        - In permissionService, I add eventEmitter by using Subject class from rxjs package and declare it as boolean variable that will listen on ``isTOpLeader`` and emit every new value that assigned in isTopLeader.
        - This techniques work on shared layout as it was throw an error when i try to pass my custom directive in button angular material
        - But I need to figure out why it thrown an erro when I pass my custom directive

    - 1135
        - I've implemented a permission to allow topLeaders and meeting Manager to manage meeting... So normal member can only view a meeting details.
        - menu-component.html  --- throw an error when I use my custome directive...


- firebase cloud function review 


### =========================================== END OF JOURNALING SECTION ========================================= !!