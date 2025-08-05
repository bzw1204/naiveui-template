<script lang="ts" setup name="About" vapor>
import packageInfo from '../../../package.json' with { type: 'json' };

const { version, dependencies, devDependencies } = packageInfo;
const dependenciesList = reactive<Record<string, string>[]>([]);
const devDependenciesList = reactive<Record<string, string>[]>([]);
interface ProjectInfo {
  label: string;
  link: boolean;
  value: string;
}
const projectInfo: ProjectInfo[] = [
  {
    label: '版本号',
    link: false,
    value: version,
  },
  {
    label: '发布时间',
    link: false,
    value: '2024-06-18',
  },
  {
    label: 'GitHub',
    link: true,
    value: 'https://github.com/WANG-Fan0912/SnowAdmin',
  },
  {
    label: 'Gitee',
    link: true,
    value: 'https://gitee.com/wang_fan_w/SnowAdmin',
  },
  {
    label: '文档地址',
    link: true,
    value: 'http://101.126.93.137:81/',
  },
  {
    label: '预览地址',
    link: true,
    value: 'http://101.126.93.137/#/login',
  },
];
onMounted(() => {
  const depValues = Object.values(dependencies);
  Object.keys(dependencies).forEach((it, index) => {
    dependenciesList.push({
      label: it,
      value: depValues[index],
    });
  });
  const devDepValues = Object.values(devDependencies);
  Object.keys(devDependencies).forEach((it, index) => {
    devDependenciesList.push({
      label: it,
      value: devDepValues[index],
    });
  });
});

function handleOpen(link: string) {
  // if (link) {
  //   console.log(link);
  // }
  if (link) window.open(link);
}
</script>

<template>
  <n-flex vertical>
    <n-card title="简介">
      <p>SnowAdmin 一款基于 Vue、TypeScript、Vite5、Pinia、arco.design开源的后台管理框架，使用目前最新技术栈开发。</p>
      <p>融合了全新的UI框架，高度可自定义的主题功能使得用户可以根据自身需求轻松定制界面。</p>
      <p>代码全注释，可提供参考和学习。</p>
    </n-card>
    <n-card title="项目信息">
      <n-descriptions bordered size="small" label-placement="left" :column="2"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }">
        <n-descriptions-item v-for="item of projectInfo" :key="item.label" :label="item.label">
          <n-button v-if="item.link" text tag="a" :href="item.value" target="_blank" type="primary">
            {{ item.label }}
          </n-button>
          <span v-else>{{ item.value }}</span>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="依赖">
      <n-descriptions label-placement="top" bordered size="small" :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }">
        <n-descriptions-item v-for="item of dependenciesList" :key="item.label" :label="item.label">
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="开发依赖">
      <n-descriptions label-placement="top" bordered size="small" :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }">
        <n-descriptions-item v-for="item of devDependenciesList" :key="item.label" :label="item.label">
          {{ item.value }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-flex>
</template>