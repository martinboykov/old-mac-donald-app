![Build|Test|Deploy](https://github.com/martinboykov/old-mac-donald-app/workflows/Build|Test|Deploy/badge.svg)

# The OldMacDonald app

#### Demo: <a href="https://martinboykov.github.io/old-mac-donald-app" target="_blank">https://martinboykov.github.io/old-mac-donald-app</a>

### Description:
  SPA(single page application) that shows 5 verses of the nursery rhyme “Old   MacDonald  Had a Farm” with 5 animals.

  The verse is repeated for each animal and the appropriate sound for the animal is used cows go “moo”, ducks go “quack” etc.

  Example of a verse for an animal width name `dog` and sound `bau`:

    Old MacDonald had a farm, E I E I O,
    And on his farm he had some dogs, E I E I O.
    With a bau-bau here and a bau-bau there,
    Here a bau, there a bau, ev’rywhere a bau-bau.
    Old MacDonald had a farm, E I E I O.

  The User can add by his choosing their own set of animals and sounds through UI by clicking `ADD ANIMAL` button and navigating to `Edit-Animal` section. There he can choose to add more than one animal by clicking on `ADD NEW ANIMAL` button, which will render additional fields for the next animal. To add the animals to group of animals the User must click on `SAVE ANIMALS`. After the animals are added, the user will be navigated to `/` root route of the application. The User can choose to remove animal field group by clicking on red-dot-button next to the form field group.


### Technologies used:
* Angular v.9

### Build-Process:

1. Install dependencies `npm install`
2. For developer environment run `ng serve`
3. For testing the application `ng test`

   - edit the `deploy` configuration in `angular.json` width your data

There is CI/CD configuration file at .github/workflows/gh-action.yaml, which is testing, building and deploying the app in windows, linux and macOs on every push and pull-request from/to master branch.

You can see the deployed app on github-pages from the demo above!
