## ALGORITHM TO SOLVE THE FOLLOWING ISSUE:
1. ENABLE CHAIRPERSOM TO REMOVE USER.
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