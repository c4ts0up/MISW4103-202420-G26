Feature: Crear una nueva publicación y programarla

@user1 @web
Scenario: E1 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha valida
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E1"
  And I wait for 2 seconds
  And I am creating a new post on "E1"
  And I fill the title with "<TITLE_POST>" and the content with "<CONTENT_POST>" on "E1"
  When I want to schedule the post on "E1"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E1"
  And I enter "<POST_DATE>" and "<POST_TIME>" as publication date on "E1"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E1"
  And I press the button to schedule the post on "E1"
  And I wait for 1 seconds
  Then The post is correctly scheduled on "E1"

@user2 @web
Scenario: E2 - Como usuario accedo a la plataforma Ghost, creo una publicación y la programo con una fecha invalida
  Given I am correctly authenticated with "<USERNAME>" and "<PASSWORD>" on "E2"
  And I wait for 2 seconds
  And I am creating a new post on "E2"
  And I fill the title with "<TITLE_POST_INVALID>" and the content with "<CONTENT_POST_INVALID>" on "E2"
  When I want to schedule the post on "E2"
  And I wait for 1 seconds
  And I select the option to schedule for later on "E2"
  And I enter "<POST_DATE_INVALID>" and "<POST_TIME_INVALID>" as publication date on "E2"
  And I wait for 1 seconds
  And I press the button to finish configurating the post on "E2"
  And I wait for 1 seconds
  Then I should get a message error for invalid date on "E2"