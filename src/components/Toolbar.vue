<template>
    <b-navbar centered shadow type="is-light">
        <template slot="brand">
            <b-navbar-item to="/slideshow" tag="router-link">
                <b-button type="is-link" size="is-medium"
                    icon-left="home-outline" />
            </b-navbar-item>
            <b-navbar-item to="/" tag="router-link">
                <b-button type="is-link" size="is-medium"
                    icon-left="text-box-search-outline" />
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item to="/employees" tag="router-link">
                <b-button type="is-link" size="is-medium"
                    icon-left="account-group">
                    PERSONAL
                </b-button>
            </b-navbar-item>
            <b-navbar-item to="/documents" tag="router-link">
                <b-button type="is-link" size="is-medium"
                    icon-left="file-document-multiple-outline">
                    DOCUMENTE
                </b-button>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: "Toolbar",

  data: () => ({

  })
};
</script>
