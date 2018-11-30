<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions allow us to keep track of who is logged in and for how long they will be
authorized to access certain material.

2. What does bcrypt do to help us store passwords in a secure manner.

bycrypt allows us to hash our password, preferablly with 14 salts

3. What does bcrypt do to slow down attackers?

bcrypt uses an algo that will hash our password though multiple rounds, which means
the attacker will need to know our algo, our hash, and how many rounds we used.

4. What are the three parts of the JSON Web Token?

The header, the payload, the signature.
