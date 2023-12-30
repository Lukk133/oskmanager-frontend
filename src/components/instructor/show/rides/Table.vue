<template>
    <div class="divTable">
        <slot name="body" class="testowe"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'CustomTable',
    props: {
        headers: Array
    },
    data() {
        return {
        };
    }
}
</script>
  
<style >
.divTable {
    display: table;
    width: 100%;
    border-collapse: collapse;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: Rubik;
    font-size: 14px;
    color: #41494E;
}

.divRow {
    display: table-row;
    background-color: #FFF;
    margin-bottom: 10px;
}

.divCell {
    display: table-cell;
    padding: 10px;
    text-align: left;
}

.divRow .divCell:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

.divRow .divCell:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>
