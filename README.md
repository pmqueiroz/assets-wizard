## Assets Wizard
![cover](./.github/assets/cover.png)

### What is? 

A Figma plugin to send assets directly to webhooks (currently only support [github actions repository dipatches](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch))

### Settings

|Name | Description |
|-----|-------------|
|Repo | Github repository name following the pattern ORG_NAME/REPO_NAME |
|Token| Github [personal access token](https://github.com/settings/tokens) with access to the given repository|
|Event Type | Type that will [trigger an repository dispatch](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch) |
