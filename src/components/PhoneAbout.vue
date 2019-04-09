<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: 'About',
        data() {
            return {
                example:'hello'
            }
        },
        created() {

        },
        mounted() {

        },
        computed:{
            reversedExample: function() {
                return this.example.split('').reverse().join('')
            }
        },
        methods:{
            
        }
    }
</script>

<style scoped>

</style>