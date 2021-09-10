import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { get{{pluralModelNamePascal}} } from "../../api/{{modelNameCamel}}";
import { DataGrid } from "@material-ui/data-grid";
{{#componentImports}}
import { {{component.cell}} } from '../types/{{component.cell}}';
{{/componentImports}}
import { ContentContainer } from "../common/containers/ContentContainer";

function getColumns() {
  return [
    {{#properties}}
    {{^isModel}}
    {{#isPrimary}}
    {
      field: "{{propertyNameCamel}}",
      headerName: "{{propertyName}}",
      flex: {{flex}},
      renderCell: ({ row: {{modelNameCamel}} }) => {
        return (
          <Link to={`/{{modelNameCamel}}/{{=<% %>=}}${<%modelNameCamel%>.id}<%={{ }}=%>`}>
            <{{component.cell}} value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
          </Link>
        );
      },
    },
    {{/isPrimary}}
    {{^isPrimary}}
    {
      field: "{{propertyNameCamel}}",
      headerName: "{{propertyName}}",
      hide: {{hide}},
      flex: {{flex}},
      renderCell: ({ row: {{modelNameCamel}} }) => {
        return (
          <{{component.cell}} value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
        );
      },
    },
    {{/isPrimary}}
    {{/isModel}}
    {{/properties}}
  ];
}

export function {{modelNamePascal}}Collection() {
  const [{{pluralModelNameCamel}}, set{{pluralModelNamePascal}}] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    try {
      setIsLoading(true);
      const {{pluralModelNameCamel}} = await get{{pluralModelNamePascal}}();
      console.log({{=<% %>=}}{<%pluralModelNameCamel%>}<%={{ }}=%>);
      set{{pluralModelNamePascal}}({{pluralModelNameCamel}});
    } catch (error) {
      setError(error);
    }
    
    setIsLoading(false);
  }

  const actions = [{ Icon: AddIcon, to: "{{modelNamePascal}}", label: "Add" }];

  return (
    <ContentContainer
      title="{{pluralModelName}}"
      error={error}
      loading={isLoading}
      actions={actions}
    >
      <div style={{=<% %>=}}{{ display: "flex", height: "100%" }}<%={{ }}=%>>
        <div className="test" style={{=<% %>=}}{{ flexGrow: 1 }}<%={{ }}=%>>
          <DataGrid
            columns={getColumns()}
            rows={{=<% %>=}}{<%pluralModelNameCamel%>}<%={{ }}=%>
            className="datagrid"
            disableSelectionOnClick
          />
        </div>
      </div>
    </ContentContainer>
  );
}
