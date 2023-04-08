import {
  FormControl,
  Grid,
  InputLabel,
  Slider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Fragment } from "react";
import { TypeIcon, typeList, TypeName } from "../../components/types";

export default function EditAffinities({ npc, setNpc }) {
  const onChangeAffinity = (type) => {
    return (e) => {
      const value = num2str(e.target.value);

      setNpc((prevState) => {
        const newState = Object.assign({}, prevState);
        if (value === "") {
          delete newState.affinities[type];
        } else {
          newState.affinities[type] = value;
        }
        return newState;
      });
    };
  };

  const onChangeIgnore = (type) => {
    return (e) => {
      setNpc((prevState) => {
        const newState = Object.assign({}, prevState);
        if (!newState.ignore[type]) {
          newState.ignore[type] = false;
        }
        newState.ignore[type] = e.target.checked;
        return newState;
      });
    }
  };
  /*const onChangeAffinityType = (type) => {
    return (e) => {
      const value = e.target.value
      setNpc((prevState) => {
        const newState = Object.assign({}, prevState);
        if (value === "") {
          delete newState.affinitiesignore[type];
        } else {
          newState.affinitiesignore[type] = value;
        }
        return newState;
      });
    };
  };*/

  const str2num = function (value) {
    if (!value) {
      return 1;
    }
    if (value === "vu") {
      return 0;
    }
    if (value === "rs") {
      return 2;
    }
    if (value === "im") {
      return 3;
    }
    if (value === "ab") {
      return 4;
    }
    return null;
  };

  const num2str = function (value) {
    if (value === 0) {
      return "vu";
    }
    if (value === 1) {
      return "";
    }
    if (value === 2) {
      return "rs";
    }
    if (value === 3) {
      return "im";
    }
    if (value === 4) {
      return "ab";
    }

    return null;
  };

  return (
    <>
      <Typography variant="h6">Affinity</Typography>
      <Grid container sx={{ mt: 2, pr: 2 }} rowSpacing={1}>
        {Object.keys(typeList).map((type, i, arr) => {
          const marks =
            i === arr.length - 1
              ? [
                  {
                    value: 0,
                    label: "Vulnerability",
                  },
                  {
                    value: 1,
                    label: " ",
                  },
                  {
                    value: 2,
                    label: "Resistance",
                  },
                  {
                    value: 3,
                    label: "Immunity",
                  },
                  {
                    value: 4,
                    label: "Absorption",
                  },
                ]
              : [];

          type = typeList[type];
          const value = str2num(npc.affinities[type]);
          var checkreturn = false
          if (npc.ignore[type] != null){
             checkreturn = npc.ignore[type]
          };
          return (
            <Fragment key={i}>
              <Grid item xs={2}>
                <InputLabel id={type}>
                  <TypeIcon type={type} /> <TypeName type={type} />
                </InputLabel>
              </Grid>
              <Grid item xs={9}>
                <FormControl variant="standard" fullWidth>
                  <Slider
                    marks={marks}
                    min={0}
                    max={4}
                    step={1}
                    size="small"
                    value={value}
                    onChange={onChangeAffinity(type)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel 
                    id="ignore"
                    title={"Ignore "+type+" cost"}
                    size="small"
                    checked={checkreturn}
                    style={
                      { 
                      marginTop: -7,
                      paddingBottom: 0 
                      }
                    }
                    control={<Checkbox/>}
                    labelPlacement="start"
                    label=""
                    onChange={onChangeIgnore(type)}
                  />
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
}
