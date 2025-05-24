---
title: Edit
description: Button to edit a page on GitHub
---

If you want your readers to be able to edit a page of your document on GitHub, you can enable the edit button in the header that contains the title.

## Parameters

To activate the edit button, you need to add the following custom parameter to your goHugo configuration file. It should contain the exact path to the "content" folder:

{{< code >}}
{{< tab "toml" >}}
[params]
  github_repo_edit = "https://github.com/zkreations/docs/blob/master/demo/content"
{{< /tab >}}
{{< tab "yaml" >}}
params:
  github_repo_edit: "https://github.com/zkreations/docs/blob/master/demo/content"
{{< /tab >}}
{{< tab "json" >}}
"params": {
  "github_repo_edit": "https://github.com/zkreations/docs/blob/master/demo/content"
}
{{< /tab >}}
{{< /code >}}
